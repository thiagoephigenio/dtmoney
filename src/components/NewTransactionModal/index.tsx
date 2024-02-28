import { useState } from 'react';
import Modal from 'react-modal';
import { useTransactions } from '../../hooks/useTransactions';
import { zodResolver } from "@hookform/resolvers/zod"

import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import closeImg from '../../assets/close.svg';

import { Container, TransactionTypeContainer, RadioBox } from './styles';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const transactionSchema = z.object({
  title: z.string().min(1, 'Este deve ser preenchido.'),
  amount: z.number({invalid_type_error: 'Digite um valor diferente de 0.'}).nullable(),
  category: z.string().min(1, 'Este campo ser preenchido.'),
})

type TransactionType = z.infer<typeof transactionSchema>

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
  const { createTransaction } = useTransactions()
  const { register, formState: { errors }, handleSubmit, reset } = useForm<TransactionType>({
    resolver: zodResolver(transactionSchema)
  })
  const [type, setType] = useState('deposit');

  async function handleCreateNewTransaction(data: TransactionType) {
    const { amount, category, title} = data;

    await createTransaction({
      title,
      type,
      category,
      amount: amount ?? 0,
    })

    reset();
    onRequestClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <Container onSubmit={handleSubmit(handleCreateNewTransaction)}>
        <h2>Cadastrar transação</h2>

        <div className='input-container'>
          <input
            {...register(`title`)}
            placeholder="Título"
          />
          {errors.title && <span className='error'>{errors.title.message}</span>}
        </div>
        <div className='input-container'>
          <input
            {...register(`amount`, { valueAsNumber: true }) }
            type='number'
            step="0.01"
            placeholder="Valor"
          />
          {errors.amount && <span className='error'>{errors.amount.message}</span>}
        </div>
        <div className='input-container'>
          <input
            {...register(`category`)}
            placeholder="Categoria"
          />
          {errors.category && <span className='error'>{errors.category.message}</span>}
        </div>

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            value="deposit"
            isActive={type === 'deposit'}
            onClick={() => setType('deposit')}
            activeColor="green"
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            type="button"
            value="withdraw"
            isActive={type === 'withdraw'}
            onClick={() => setType('withdraw')}
            activeColor="red"
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>
        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  )
}
