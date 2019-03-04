import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
    render() {
        return (
            <html>
                <Head>
                    <link href="/static/styles.css" rel="stylesheet" type="text/css" />
                    <link rel="stylesheet" href="https://highlightjs.org/static/demo/styles/a11y-dark.css" />
                    <link href="https://fonts.googleapis.com/css?family=Inconsolata|Lato|Open+Sans:400,800" rel="stylesheet"></link>
                    <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
                    <style>
                        {`

                            * {
                                box-sizing: border-box;
                            }
                            
                            html, body, #__next {
                                margin: 0;
                                padding: 0;
                                width: 100%;
                                height: 100%;
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