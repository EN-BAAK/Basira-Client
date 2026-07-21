import { messageValidationSchema } from '@/constants/formsValidations'
import { initialMessageCreationValues } from '@/constants/formsValues'
import { useCreateMessage, useGetMessagesByRoomId } from '@/features/useMessages'
import { DashboardChatRoomProps } from '@/types/components'
import { MessageEntityCreation } from '@/types/models'
import { Form, Formik, FormikHelpers } from 'formik'
import { Bot, Send } from 'lucide-react'
import React, { useEffect, useRef } from 'react'
import Message from './Message'
import TextAreaField from '@/libraries/forms/components/TextAreaField'
import SubmitButton from '@/libraries/forms/components/SubmitButton'

const ChatRoom: React.FC<DashboardChatRoomProps> = ({ chatRoomId = "-1", setChatRoom }) => {
  const { mutateAsync, isPending: isTyping } = useCreateMessage(chatRoomId, setChatRoom)
  const { data, isFetching } = useGetMessagesByRoomId(chatRoomId)

  const messages = data?.data || []
  const isLoading = isTyping || isFetching

  const bottomRef = useRef<HTMLDivElement>(null);

  const onSubmit = async (
    values: MessageEntityCreation,
    helpers: FormikHelpers<MessageEntityCreation>
  ) => {
    await mutateAsync({ ...values, chatRoomId });
    helpers.resetForm();
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

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
            <Message key={m.id} message={m} />
          ))}

          {isTyping && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center text-primary shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="px-4 py-3 bg-card border border-border rounded-2xl rounded-tl-none">
                <div className="flex gap-1.5 items-center">
                  {[0, 150, 300].map((d) => (
                    <span
                      key={d}
                      className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce"
                      style={{ animationDelay: `${d}ms` }}
                    />
                  ))}
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
              <TextAreaField
                name='content'
                placeholder="اسأل عن فاتورة أو عن المبيعات..."
                disabled={isLoading}
                rows={1}
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