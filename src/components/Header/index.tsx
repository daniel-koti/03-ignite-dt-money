import { useState } from 'react'
import { HeaderContainer, HeaderContent, NewTransactionsButton } from './styles'
import * as Dialog from '@radix-ui/react-dialog'

import logoImg from '../../assets/logo.svg'
import { NewTransactionModal } from '../NewTransactionModal'

export function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  function handleOpenModal() {
    setIsModalOpen(true)
  }

  function onCloseModal() {
    setIsModalOpen(false)
  }

  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />

        <Dialog.Root open={isModalOpen}>
          <Dialog.Trigger asChild>
            <NewTransactionsButton onClick={handleOpenModal}>
              Nova transação
            </NewTransactionsButton>
          </Dialog.Trigger>

          <NewTransactionModal onCloseModal={onCloseModal} />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}
