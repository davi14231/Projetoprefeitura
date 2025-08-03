import React from "react";
import { Headeredicao } from "@/components/ui/layouts/Headeredicao";
import { Footer } from "@/components/ui/layouts/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Edit2, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SolicitarDoacao } from "./SolicitarDoacao";
import ConfirmacaoEncerrarSolicitacao from "./ConfirmacaoEncerrarSolicitacao";
import { useData } from "@/context/DataContext";
import { Pagination } from "@/components/ui/Pagination";
import ConfirmacaoDeletar from "./ConfirmacaoDeletar";

const footerColor = "#172233";

export function EditDoacoes() {
    const location = useLocation();
    const [editId, setEditId] = useState(null);
    const [editData, setEditData] = useState({});
    const [showSolicitarModal, setShowSolicitarModal] = useState(false);
    const [showConfirmacaoDeletar, setShowConfirmacaoDeletar] = useState(false);
    const [showConfirmacaoEncerrar, setShowConfirmacaoEncerrar] = useState(false);
    const [idParaExcluir, setIdParaExcluir] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [idParaEncerrar, setIdParaEncerrar] = useState(null);
    
    // Estados para armazenar dados da API
    const [doacoes, setDoacoes] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    
    const { getMinhasDoacoes, removeDoacao, encerrarDoacao, loading, error, forceUpdate } = useData();
    const navigate = useNavigate();

    const itemsPerPage = 6;

    // Efeito para ler parâmetros da URL e definir página atual
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const page = parseInt(searchParams.get('page')) || 1;
        setCurrentPage(page);
    }, [location.search]);

    // Carregar doações da API
    const carregarDoacoes = async () => {
        try {
            console.log('🔄 Carregando minhas doações...');
            const resultado = await getMinhasDoacoes('ativas');
            console.log('✅ Doações carregadas:', resultado);
            
            // Paginação local
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const itensPaginados = resultado.slice(startIndex, endIndex);
            
            setDoacoes(itensPaginados);
            setTotalItems(resultado.length);
            setTotalPages(Math.ceil(resultado.length / itemsPerPage));
        } catch (error) {
            console.error('❌ Erro ao carregar doações:', error);
        }
    };

    // Carregar doações quando a página mudar ou forceUpdate
    useEffect(() => {
        carregarDoacoes();
    }, [currentPage, forceUpdate]);

    // Prevent background scroll when any modal is open
    React.useEffect(() => {
        if (showSolicitarModal || showConfirmacaoDeletar || showConfirmacaoEncerrar) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [showSolicitarModal, showConfirmacaoDeletar, showConfirmacaoEncerrar]);

    const handleEdit = (doacao) => {
        console.log('📝 Editando doação:', doacao);
        // Mapear de volta para o formato que o modal espera
        const dadosParaEdicao = {
            id_produto: doacao.id,
            titulo: doacao.titulo,
            tipo_item: doacao.categoria,
            descricao: doacao.descricao,
            url_imagem: doacao.imageUrl,
            urgencia: doacao.urgencia,
            quantidade: doacao.quantidade,
            email: doacao.email,
            whatsapp: doacao.whatsapp,
            prazo_necessidade: doacao.prazo,
        };
        
        setEditId(doacao.id);
        setEditData(dadosParaEdicao);
        setShowSolicitarModal(true);
    };

    // Abrir modal SolicitarDoacao
    const handleOpenSolicitarModal = () => {
        setEditData(null);
        setEditId(null);
        setShowSolicitarModal(true);
    };

    // Fechar modal SolicitarDoacao
    const handleCloseSolicitarModal = () => {
        setShowSolicitarModal(false);
        setEditData(null);
        setEditId(null);
        // Recarregar após criar/editar
        carregarDoacoes();
    };

    // Abrir modal de confirmação para deletar
    const handleDelete = (id) => {
        console.log('🗑️ Preparando para deletar:', id);
        setIdParaExcluir(id);
        setShowConfirmacaoDeletar(true);
    };

    // Confirma exclusão no modal
    const handleConfirmDelete = async () => {
        if (idParaExcluir) {
            try {
                console.log('🗑️ Deletando doação:', idParaExcluir);
                await removeDoacao(idParaExcluir);
                console.log('✅ Doação deletada com sucesso');
                carregarDoacoes(); // Recarregar lista
            } catch (error) {
                console.error('❌ Erro ao deletar:', error);
                alert('Erro ao deletar doação: ' + error.message);
            }
        }
        setShowConfirmacaoDeletar(false);
        setIdParaExcluir(null);
    };

    // Abrir modal de confirmação de encerramento
    const handleOpenConfirmacaoEncerrar = (id) => {
        console.log('🔒 Preparando para encerrar:', id);
        setIdParaEncerrar(id);
        setShowConfirmacaoEncerrar(true);
    };

    // Fechar modal de confirmação de encerramento
    const handleCloseConfirmacaoEncerrar = () => {
        setShowConfirmacaoEncerrar(false);
        setIdParaEncerrar(null);
    };

    // Confirmar encerramento da solicitação
    const handleConfirmEncerramento = async () => {
        if (idParaEncerrar) {
            try {
                console.log('🔒 Encerrando doação:', idParaEncerrar);
                await encerrarDoacao(idParaEncerrar);
                console.log('✅ Doação encerrada com sucesso');
                carregarDoacoes(); // Recarregar lista
            } catch (error) {
                console.error('❌ Erro ao encerrar:', error);
                alert('Erro ao encerrar doação: ' + error.message);
            }
        }
        setShowConfirmacaoEncerrar(false);
        setIdParaEncerrar(null);
    };

    return (
        <div className="bg-[#fafbfc] min-h-screen flex flex-col relative">
            <Headeredicao />
            <main className="flex-1">
                {/* Header Section */}
                <section className="bg-[#172233] text-white py-12">
                    <div className="max-w-6xl mx-auto px-4">
                        <h1 className="text-3xl font-bold mb-3">Editar Solicitações</h1>
                        <p className="text-gray-300 max-w-2xl">
                            Gerencie suas solicitações de doação. Edite informações, monitore o progresso e mantenha sua ONG organizada.
                        </p>
                    </div>
                </section>

                {/* Botão Criar Nova Solicitação */}
                <section className="max-w-6xl mx-auto px-4 -mt-6 mb-8">
                    <button
                        onClick={handleOpenSolicitarModal}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg font-medium transition-colors"
                        disabled={loading}
                    >
                        + Nova Solicitação de Doação
                    </button>
                </section>

                {/* Loading e Error */}
                {loading && (
                    <div className="max-w-6xl mx-auto px-4 mb-8 text-center">
                        <p className="text-gray-600">Carregando doações...</p>
                    </div>
                )}

                {error && (
                    <div className="max-w-6xl mx-auto px-4 mb-8">
                        <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded">
                            ❌ Erro: {error}
                        </div>
                    </div>
                )}

                {/* Listagem de pedidos editáveis */}
                <section className="max-w-6xl mx-auto px-4 mb-8">
                    {/* Contador de itens */}
                    <div className="mb-4 text-sm text-gray-600 font-medium">
                        📊 {totalItems} itens encontrados - Página {currentPage} de {totalPages}
                    </div>
                    
                    <Card className="w-full bg-white border">
                        <CardContent className="py-6 px-8">
                            <div className="flex flex-col gap-6">
                                {doacoes.length === 0 && !loading ? (
                                    <div className="text-center py-8 text-gray-500">
                                        📭 Nenhuma doação encontrada. Crie sua primeira solicitação!
                                    </div>
                                ) : (
                                    doacoes.map((doacao) => (
                                        <div
                                            key={doacao.id}
                                            className="flex items-start gap-4 border-b pb-6 last:border-b-0 last:pb-0"
                                        >
                                            {/* Imagem */}
                                            <img
                                                src={doacao.imageUrl || '/imagens/placeholder.jpg'}
                                                alt={doacao.titulo}
                                                className="w-16 h-16 object-cover rounded-lg border mt-1"
                                                onError={(e) => {
                                                    e.target.src = '/imagens/placeholder.jpg';
                                                }}
                                            />
                                            
                                            {/* Conteúdo */}
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 w-full mb-2">
                                                    <span className="font-semibold text-lg text-gray-800">
                                                        {doacao.titulo}
                                                    </span>
                                                    <span className="px-3 py-1 rounded-full text-xs font-semibold shadow bg-blue-500 text-white">
                                                        {doacao.categoria}
                                                    </span>
                                                    <div className="flex-1"></div>
                                                    
                                                    {/* Botões de ação */}
                                                    <button
                                                        className="flex items-center gap-1 px-4 py-2 border rounded-lg text-sm font-medium hover:bg-neutral-100 cursor-pointer shadow hover:scale-[1.03] transition-transform"
                                                        onClick={() => handleEdit(doacao)}
                                                        disabled={loading}
                                                    >
                                                        <Edit2 className="w-4 h-4" /> Editar
                                                    </button>
                                                    <button
                                                        className="flex items-center justify-center p-2 rounded-full hover:bg-red-100 transition-colors cursor-pointer ml-2"
                                                        title="Excluir"
                                                        onClick={() => handleDelete(doacao.id)}
                                                        style={{ color: '#e3342f' }}
                                                        disabled={loading}
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                                
                                                {/* Informações da doação */}
                                                <div className="text-sm text-gray-600 mb-2">
                                                    📦 Quantidade: {doacao.quantidade} | 
                                                    ⚡ Urgência: {doacao.urgencia} | 
                                                    ⏰ Tempo restante: {doacao.tempoRestante}
                                                </div>
                                                
                                                <p className="text-gray-700 text-sm mb-3 leading-relaxed">
                                                    {doacao.descricao}
                                                </p>
                                                
                                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                                    <span>📅 Publicado: {doacao.publicado}</span>
                                                    <span>📧 {doacao.email}</span>
                                                    <span>📱 {doacao.whatsapp}</span>
                                                    <div className="flex-1"></div>
                                                    <button
                                                        className="px-3 py-1 bg-orange-500 text-white rounded text-xs hover:bg-orange-600 transition-colors"
                                                        onClick={() => handleOpenConfirmacaoEncerrar(doacao.id)}
                                                        disabled={loading}
                                                    >
                                                        Encerrar solicitação
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* Paginação */}
                {totalPages > 1 && (
                    <div className="mb-8">
                        <Pagination 
                            currentPage={currentPage}
                            totalPages={totalPages}
                            baseUrl="/edit-doacoes"
                        />
                    </div>
                )}

            </main>
            <Footer />

            {/* Modais */}
            {showSolicitarModal && (
                <SolicitarDoacao 
                    onClose={handleCloseSolicitarModal}
                    editData={editData}
                />
            )}

            {showConfirmacaoDeletar && (
                <ConfirmacaoDeletar
                    onClose={() => setShowConfirmacaoDeletar(false)}
                    onConfirm={handleConfirmDelete}
                />
            )}

            {showConfirmacaoEncerrar && (
                <ConfirmacaoEncerrarSolicitacao
                    onClose={handleCloseConfirmacaoEncerrar}
                    onConfirm={handleConfirmEncerramento}
                />
            )}
        </div>
    );
}