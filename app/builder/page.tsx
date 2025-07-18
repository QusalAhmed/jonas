"use client";
import React from 'react';
import { Paper, Grid } from '@mui/material';

import { Toolbox } from '@/components/user/Toolbox';
import { SettingsPanel } from '@/components/user/SettingsPanel';

import { Container } from '@/components/user/Container';
import { Button } from '@/components/user/Button';
import { Card, CardTop, CardBottom } from '@/components/user/Card';
import { Text } from '@/components/user/Text';
import Product from '@/components/user/Product';
import { Topbar } from '@/components/user/Topbar';

import { Editor, Frame, Element } from "@craftjs/core";

export default function App() {
    return (
        <>
            <Topbar/>
            <Editor resolver={{Card, Button, Text, CardTop, CardBottom, Container, Product}}>
                <div className='flex flex-row justify-around items-center'>
                    <Frame>
                        <Element is={Container} padding={5} canvas background={'#de11c3'}>
                            <Element is={Container} padding={10} background={'#f0f0f0'} canvas>
                                <Text text="It's me again!"/>
                            </Element>
                            <Element is={Container} padding={10} background={'#f0f0f0'} canvas>
                                <Button size="small" variant="outlined" color={'success'}>Click</Button>
                                <Button size="small" variant="outlined" color={'warning'}>Click</Button>
                                <Card background={'#90dccbd6'}/>
                            </Element>
                            <Element is={Container} padding={10} background={'#f0f0f0'} canvas>
                                <Text text="It's me again!"/>
                                <Product/>
                            </Element>
                        </Element>
                    </Frame>
                    <Grid>
                        <Paper>
                            <Toolbox/>
                            <SettingsPanel/>
                        </Paper>
                    </Grid>
                </div>
            </Editor>
        </>
    );
}