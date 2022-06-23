import { isNil } from 'lodash'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { UserForms } from '../../@types/view'
import { useMutateUsers } from '../../scripts/hooks/useMutateUsers'
import { useQueryUsers } from '../../scripts/hooks/useQueryUsers'
import { ErrorMessage } from '../atoms/ErrorMessage'
import { Input } from '../atoms/Forms/Input'
import { Textarea } from '../atoms/Forms/Textarea'
import { Loading } from '../atoms/Loading'
import { PrimaryButton } from '../atoms/PrimaryButton'
import { SectionTitle } from '../atoms/SectionTitle'
import { Form } from '../molecules/Form'
import { SectionLayout } from '../template/SectionLayout'

export const EditUser = () => {
  /*
   * Hooks
   */
  const params = useParams<{ id: string }>()
  const { register, handleSubmit } = useForm<UserForms>({
    criteriaMode: 'all',
  })
  const { updateUserMutation } = useMutateUsers()
  const { data: userData, status: userStatus } = useQueryUsers({
    filter: `userId[equals]${params.id}`,
  })

  if (userStatus === 'loading') {
    return <Loading />
  }

  return (
    <SectionLayout sectionName="edit-user">
      <SectionTitle>Settings</SectionTitle>
      {isNil(userData) ? (
        <div style={{ marginTop: '30px' }}>
          <ErrorMessage>ユーザーが存在しません。</ErrorMessage>
        </div>
      ) : (
        <form
          className="p-section_forms"
          onSubmit={handleSubmit((data) =>
            updateUserMutation.mutate({
              id: userData.contents[0].id,
              username: data.username,
              photoURL: '',
              description: data.description,
              twitterUrl: data.twitterUrl,
              instagramUrl: data.instagramUrl,
            })
          )}
        >
          <Form id="username-form" label="お名前">
            <Input
              id="username-form"
              placeholder="ユーザー名を入力してください。"
              {...register('username', { maxLength: 256, required: true })}
              isBg
            />
          </Form>
          <Form id="description-form" label="自己紹介">
            <Textarea
              id="description-form"
              placeholder="自己紹介を入力してください。"
              {...register('description', { maxLength: 1000 })}
              isBg
            />
          </Form>
          <Form id="twitter-form" label="twitterリンク">
            <Input
              id="twitter-form"
              placeholder="Twitter URLを入力してください。"
              {...register('twitterUrl')}
              isBg
            />
          </Form>
          <Form id="instagram-form" label="instagramリンク">
            <Input
              id="instagram-form"
              placeholder="ユーザー名を入力してください。"
              {...register('instagramUrl', { maxLength: 256, required: true })}
              isBg
            />
          </Form>
          <PrimaryButton type="submit">Update</PrimaryButton>
        </form>
      )}
    </SectionLayout>
  )
}
