import { useContext } from 'react'
import { CircleNotch, MagnifyingGlass } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { SearchFormContainer } from './styles'
import { zodResolver } from '@hookform/resolvers/zod'
import { TransactionsContext } from '../../../../contexts/TransactionsContext'
import * as z from 'zod'

const SearchFormSchema = z.object({
  query: z.string(),
})

type SearchFormInputs = z.infer<typeof SearchFormSchema>

export function SearchForm() {
  const { fetchTransactions } = useContext(TransactionsContext)

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
