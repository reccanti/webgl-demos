import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
    render() {
        return (
            <html>
                <Head>
                    <link href="/static/styles.css" rel="stylesheet" type="text/css" />
                    <link rel="stylesheet" href="https://highlightjs.org/static/demo/styles/a11y-dark.css" />
                    <style>
                        {`
                            html, body, #__next {
                                width: 100%;
                                height: 100%;
                            }
                            body {
                                margin: 0;
                            }
                        `}
                    </style>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        )
    }
}