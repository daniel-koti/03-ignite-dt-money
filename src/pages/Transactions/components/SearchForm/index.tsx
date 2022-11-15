import { memo } from 'react'
import { CircleNotch, MagnifyingGlass } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { SearchFormContainer } from './styles'
import { zodResolver } from '@hookform/resolvers/zod'
import { TransactionsContext } from '../../../../contexts/TransactionsContext'
import * as z from 'zod'
import { useContextSelector } from 'use-context-selector'

/**
 * Por que um componente renderiza?
 * - Hook changed (mudou estado, contexto, reducer)
 * - Props changed (mudou propriedades)
 * - Parent rerendered (componente pai renderizou)
 *
 * Qual o fluxo de renderização?
 * O React recria o HTML da interface daquele componente
 * Compara a versão do HTML recriado com a versão anterior
 * SE mudou alguma coisa, ele rescreve o HTML na tela
 *
 * Memo
 */

const SearchFormSchema = z.object({
  query: z.string(),
})

type SearchFormInputs = z.infer<typeof SearchFormSchema>

function SearchFormComponent() {
  const fetchTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.fetchTransactions
    },
  )

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(SearchFormSchema),
  })

  async function handleSearchTransactions(data: SearchFormInputs) {
    await fetchTransactions(data.query)
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Busque por transações"
        {...register('query')}
      />

      {!isSubmitting ? (
        <button type="submit">
          <MagnifyingGlass size={20} />
          Buscar
        </button>
      ) : (
        <button type="submit" disabled>
          <CircleNotch size={20}>
            <animateTransform
              attributeName="transform"
              type="rotate"
              dur="0.8s"
              to="360"
              repeatCount="indefinite"
            />
          </CircleNotch>
          Buscar
        </button>
      )}
    </SearchFormContainer>
  )
}

export const SearchForm = memo(SearchFormComponent)
