import React from "react";
import { Box, Typography, Grid, Button as MaterialButton } from "@mui/material";
import { Element, useEditor } from "@craftjs/core";

import { Container } from '@/components/user/Container';
import { Button } from '@/components/user/Button';
import { Card } from '@/components/user/Card';
import { Text } from '@/components/user/Text';
import Product from '@/components/user/Product';

export const Toolbox = () => {
    const {connectors, query} = useEditor();

    return (
        <Box px={2} py={2}>
            <Grid container direction="column" spacing={2} bgcolor="rgba(0, 0, 0, 0.06)" mt={2} px={2} py={2}>
                <Box pb={2}>
                    <Typography>Drag to add</Typography>
                </Box>
                <Grid container direction="column">
                    <MaterialButton variant="contained"
                                    ref={ref => {
                                        if (ref)
                                            connectors.create(ref,
                                                <Button size="small" variant={'contained'} color={'success'}>Button</Button>)
                                    }}
                    >
                        Button
                    </MaterialButton>
                </Grid>
                <Grid container direction="column">
                    <MaterialButton variant="contained"
                                    ref={ref => {
                                        if (ref)
                                            connectors.create(ref,
                                                <Element is={Text} text="Text" fontSize={20} canvas/>)
                                    }}
                    >
                        Text
                    </MaterialButton>
                </Grid>
                <Grid container direction="column">
                    <MaterialButton variant="contained"
                                    ref={ref => {
                                        if (ref)
                                            connectors.create(ref,
                                                <Element is={Card} background={'#90dccbd6'} canvas/>)
                                    }}
                    >
                        Container
                    </MaterialButton>
                </Grid>
                <Grid container direction="column">
                    <MaterialButton variant="contained"
                                    ref={ref => {
                                        if (ref)
                                            connectors.create(ref,
                                                <Element is={Container} padding={10} background={'#f0f0f0'} canvas>
                                                    <Text text="It's me again!"/>
                                                    <Product/>
                                                </Element>)
                                    }}
                    >
                        Card
                    </MaterialButton>
                </Grid>
            </Grid>
        </Box>
    )
};