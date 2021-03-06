import { ErrorMessage as RhfErrorMessage } from '@hookform/error-message'
import { isEmpty, isNil } from 'lodash'
import { ChangeEvent, useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { UserForms } from '../../@types/view'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectUser, setPhotoUrl } from '../../app/slices/userSlice'
import { useGetImageUrl } from '../../scripts/hooks/useGetImageUrl'
import { useMutateUsers } from '../../scripts/hooks/useMutateUsers'
import { useQueryUsers } from '../../scripts/hooks/useQueryUsers'
import { useToast } from '../../scripts/hooks/useToast'
import { ERROR_CODES } from '../../scripts/lib/error'
import { UPDATE_SUCCESS_MESSAGE, URL_VALID } from '../../scripts/utils/const'
import { ErrorMessage as MyErrorMessage } from '../atoms/ErrorMessage'
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
  const dispatch = useAppDispatch()
  const { user: loginUser } = useAppSelector(selectUser)
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<UserForms>({
    criteriaMode: 'all',
  })
  const { updateUserMutation } = useMutateUsers()
  const {
    mutate: updateUserMutate,
    isLoading: updateUserIsLoading,
    isSuccess: updateUserIsSuccess,
  } = updateUserMutation
  const { data: userData, status: userStatus } = useQueryUsers({
    filter: `userId[equals]${params.id}`,
  })
  const { onChangedImageUrl } = useGetImageUrl()
  const { showToast } = useToast()

  const onSubmit = useCallback(
    (data: UserForms) => {
      if (!isNil(userData)) {
        updateUserMutate({
          id: userData.contents[0].id,
          name: data.username,
          photoURL: loginUser.photoUrl,
          description: data.description,
          twitterUrl: data.twitterUrl,
          instagramUrl: data.instagramUrl,
        })
      }
    },
    [userData, loginUser]
  )

  /*
   * ?????????????????????????????????
   */
  useEffect(() => {
    let isMounted = true
    if (isMounted && !isNil(userData) && !isEmpty(userData.contents)) {
      const data = userData.contents[0]
      setValue('username', data.name)
      setValue('description', data.description || '')
      setValue('twitterUrl', data.twitterUrl || '')
      setValue('instagramUrl', data.instagramUrl || '')
    }
    return () => {
      isMounted = false
    }
  }, [userData])

  /*
   * ???????????????
   */
  useEffect(() => {
    if (updateUserIsSuccess) {
      showToast('success', UPDATE_SUCCESS_MESSAGE)
    }
  }, [updateUserIsSuccess])

  if (userStatus === 'loading') {
    return <Loading />
  }

  return (
    <SectionLayout sectionName="edit-user">
      {isNil(userData) || isEmpty(userData.contents) ? (
        <div style={{ marginTop: '30px' }}>
          <MyErrorMessage>????????????????????????????????????</MyErrorMessage>
        </div>
      ) : (
        <div className="p-section-edit-user_contents">
          <aside className="p-section-edit-user_side">
            <SectionTitle>Settings</SectionTitle>
            <figure className="p-section-edit-user_icon">
              <img src={loginUser.photoUrl} alt={userData.contents[0].name} />
              <figcaption className="p-section-edit-user_caption">
                <label htmlFor="user-image-setting">
                  ??????
                  <input
                    id="user-image-setting"
                    type="file"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      onChangedImageUrl(e, 'user', (url) =>
                        dispatch(setPhotoUrl(url))
                      )
                    }
                  />
                </label>
              </figcaption>
            </figure>
          </aside>
          <form
            className="p-section_forms-user"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Form id="username-form" label="?????????">
              <Input
                id="username-form"
                placeholder="?????????????????????????????????????????????"
                {...register('username', {
                  maxLength: {
                    value: 256,
                    message: ERROR_CODES.VALIDATE_TEXT_256.errMsg,
                  },
                  required: ERROR_CODES.REQUIRED_TEXT.errMsg,
                })}
                isBg
              />
              <RhfErrorMessage
                name="username"
                errors={errors}
                render={({ message }) => (
                  <MyErrorMessage>{message}</MyErrorMessage>
                )}
              />
            </Form>
            <Form id="description-form" label="????????????">
              <Textarea
                id="description-form"
                placeholder="??????????????????????????????????????????"
                {...register('description', { maxLength: 1000 })}
                isBg
              />
              <RhfErrorMessage
                name="description"
                errors={errors}
                render={({ message }) => (
                  <MyErrorMessage>{message}</MyErrorMessage>
                )}
              />
            </Form>
            <Form id="twitter-form" label="twitter?????????">
              <Input
                id="twitter-form"
                placeholder="Twitter ??????????????????URL??????????????????????????????"
                {...register('twitterUrl', {
                  required: false,
                  pattern: {
                    value: URL_VALID,
                    message: ERROR_CODES.VALIDATE_URL.errMsg,
                  },
                })}
                isBg
              />
              <RhfErrorMessage
                name="twitterUrl"
                errors={errors}
                render={({ message }) => (
                  <MyErrorMessage>{message}</MyErrorMessage>
                )}
              />
            </Form>
            <Form id="instagram-form" label="instagram?????????">
              <Input
                id="instagram-form"
                placeholder="Instagram ??????????????????URL??????????????????????????????"
                {...register('instagramUrl', {
                  required: false,
                  pattern: {
                    value: URL_VALID,
                    message: ERROR_CODES.VALIDATE_URL.errMsg,
                  },
                })}
                isBg
              />
              <RhfErrorMessage
                name="instagramUrl"
                errors={errors}
                render={({ message }) => (
                  <MyErrorMessage>{message}</MyErrorMessage>
                )}
              />
            </Form>
            <PrimaryButton
              type="submit"
              disabled={updateUserIsLoading}
              isLoading={updateUserIsLoading}
            >
              Update
            </PrimaryButton>
          </form>
        </div>
      )}
    </SectionLayout>
  )
}
