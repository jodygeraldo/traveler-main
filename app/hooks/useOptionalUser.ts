import * as Zod from 'zod'
import useMatchesDataSafe from './useMatchesDataSafe'

export default function useOptionalUser() {
  const UserSchema = Zod.object({
    user: Zod.object({
      id: Zod.string(),
      email: Zod.string(),
      role: Zod.enum(['USER', 'ADMIN']),
      accounts: Zod.array(Zod.object({ id: Zod.string(), name: Zod.string() })),
    }),
  })

  const data = useMatchesDataSafe({ id: 'root', schema: UserSchema })
  return data?.user
}
