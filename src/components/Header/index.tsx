import logoImg from '../../assets/logo.svg'
import { Container, Content } from './styles'

interface HeaderPops {
  onOpenNewTransactionModal: () => void;
}

export function Header({ onOpenNewTransactionModal }: HeaderPops) {

  return (
    <Container>
      <Content>
        <header>
          <img src={logoImg} alt="dt money" />
          <button type="button" onClick={onOpenNewTransactionModal} >Nova transação</button>
        </header>

      </Content>
    </Container>
  )
}
