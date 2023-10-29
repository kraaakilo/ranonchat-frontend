export type SingleChatProps = {
    message: string;
    isUser: boolean;
};

const SingleChat = (props: SingleChatProps) => {
    return (
        <div>
            {
                props.isUser ? <div className="chat-message">
                    <div className="flex items-end justify-end">
                        <div className="flex flex-col items-end order-1 max-w-xs mx-2 space-y-2">
                            <div>
                                <span className="inline-block px-4 py-2 text-white rounded-lg rounded-br-none dark:text-secondary bg-primary">
                                    {props.message}
                                </span>
                            </div>
                        </div>
                    </div>
                </div> : <div className="chat-message">
                    <div className="flex items-end">
                        <div className="flex flex-col items-start order-2 max-w-xs mx-2 space-y-2">
                            <div>
                                <span className="inline-block px-4 py-2 rounded-lg rounded-bl-none bg-secondary text-muted-foreground">
                                    {props.message}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            }

        </div>
    );
};

export default SingleChat;