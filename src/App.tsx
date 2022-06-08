import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header/index';
import Modal from 'react-modal';
import { GlobalStyle } from './styles/global';
import { NewTransactionModal } from './components/NewTransactionModal';
import { useState } from 'react';
import { TransactionsProvider } from './hooks/useTransactions';

Modal.setAppElement('#root');

export function App() {
  const [isNewTransacionModalOpen, setIsNewTransacionModalOpen] = useState(false);

  function handleOpenNewTransacionModalOpen() {
    setIsNewTransacionModalOpen(true);
  }
  function handleCloseNewTransacionModalOpen() {
    setIsNewTransacionModalOpen(false);
  }

  return (
    <TransactionsProvider>
      <Header onOpenNewTransactionModal={handleOpenNewTransacionModalOpen} />
      
      <Dashboard />
      
      <NewTransactionModal isOpen={isNewTransacionModalOpen} onRequestClose={handleCloseNewTransacionModalOpen} />
      
      <GlobalStyle />
    </TransactionsProvider>
  );
}
