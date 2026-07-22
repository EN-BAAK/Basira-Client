import { messageValidationSchema } from '@/constants/formsValidations'
import { initialMessageCreationValues } from '@/constants/formsValues'
import { useCreateMessage, useGetMessagesByRoomId, useReceiveAiResponse } from '@/features/useMessages'
import { DashboardChatRoomProps } from '@/types/components'
import { MessageEntityCreation } from '@/types/models'
import { Form, Formik, FormikHelpers } from 'formik'
import { Bot, Send } from 'lucide-react'
import React, { useEffect, useRef } from 'react'
import Message from './Message'
import SubmitButton from '@/libraries/forms/components/SubmitButton'
import InputField from '@/libraries/forms/components/InputField'
import { useAppContext } from '@/libraries/project-provider/AppProvider'

const ChatRoom: React.FC<DashboardChatRoomProps> = ({ chatRoomId = "-1", setChatRoom }) => {
  const { user: { name } } = useAppContext()

  const { mutateAsync: sendMessageAsync, isPending: isSending, isSuccess: isSendingSucceed } = useCreateMessage(chatRoomId, setChatRoom)
  const { mutateAsync: receiveMessageAsync, isPending: isReposing } = useReceiveAiResponse(chatRoomId)
  const { data, isFetching } = useGetMessagesByRoomId(chatRoomId)

  const messages = data?.data || []
  const isLoading = isSending || isFetching

  const bottomRef = useRef<HTMLDivElement>(null);

  const onSubmit = async (
    values: MessageEntityCreation,
    helpers: FormikHelpers<MessageEntityCreation>
  ) => {
    await sendMessageAsync({ ...values, chatRoomId });
    helpers.resetForm();
    console.log(isSendingSucceed)
    if (isSendingSucceed)
      await receiveMessageAsync({ id: chatRoomId, data: values.content });
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isSending, isReposing]);

  return (
    <React.Fragment>
      {messages.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-5 p-8 overflow-auto">
          <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
            <Bot className="w-7 h-7 text-primary" />
          </div>
          <div className="text-center max-w-md">
            <h2 className="text-xl font-bold text-text mb-2 font-heading">مرحباً في المحلل المالي</h2>
            <p className="text-sm text-muted-foreground font-sans">
              اسأل عن بياناتك المالية وسأحللها لك — مدعوم بـ RAG + Text-to-SQL
            </p>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className="animate-in fade-in slide-in-from-bottom-2 duration-300"
            >
              <Message username={name} message={m} />
            </div>
          ))}

          {isReposing && (
            <div className="flex items-start gap-3 animate-in fade-in duration-300">
              <div className="w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center text-primary shrink-0">
                <Bot className="w-4 h-4" />
              </div>

              <div className="px-4 py-3 bg-card border border-border rounded-2xl rounded-tr-none">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse [animation-delay:-0.3s]" />
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse [animation-delay:-0.15s]" />
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      )}

      <div className="p-4 bg-card border-t border-border">
        <Formik
          initialValues={initialMessageCreationValues}
          onSubmit={onSubmit}
          validationSchema={messageValidationSchema}
        >
          {({ dirty, isSubmitting, isValid }) => (
            <Form className="flex items-center gap-2 max-w-3xl mx-auto">
              <InputField
                type='text'
                name='content'
                placeholder="اسأل عن فاتورة أو عن المبيعات..."
                disabled={isLoading}
                styles='flex-1 h-[50px]'
              />

              <SubmitButton
                isDirty={dirty}
                isSubmitting={isSubmitting || isLoading}
                isValid={isValid}
                Icon={Send}
                disabledLabel=''
                submittingLabel=''
                label=''
                className='w-fit flex items-center gap-3 px-4 h-[50px]'
              />
            </Form>
          )

          }
        </Formik>
      </div>
    </React.Fragment>
  )
}

export default ChatRoom