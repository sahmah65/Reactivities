﻿import React from 'react'
import { Message, MessageList } from 'semantic-ui-react';

interface Props {
    errors: string[] | undefined;
}

export default function ValidationErrors({ errors }: Props) {
    return (
        <Message error>
            {errors && (
                <Message.List>
                    {errors.map((err: any, i) => (
                        <Message.Item key={i} >
                            {err}
                        </Message.Item>
                    ))}
                </Message.List>
                )}
        </Message>
        );
}