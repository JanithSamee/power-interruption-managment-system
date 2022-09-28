import React from "react";
import { useNavigate } from "react-router-dom";
import { createStyles, Container, Title, Text, Button } from "@mantine/core";

const useStyles = createStyles((theme) => ({
    root: {
        backgroundColor: "#11284b",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage:
            "linear-gradient(250deg, rgba(130, 201, 30, 0) 0%, #062343 70%), url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80)",
        paddingTop: theme.spacing.xl * 3,
        paddingBottom: theme.spacing.xl * 3,
        width: "100%",
        color: "#fff",
        height: "100vh",
    },
}));

export default function HomePage() {
    const navigate = useNavigate();
    const { classes } = useStyles();
    return (
        <div className={classes.root}>
            <Container>
                <div className={classes.inner}>
                    <div className={classes.content}>
                        <Title className={classes.title}>
                            Power{" "}
                            <Text
                                component="span"
                                inherit
                                variant="gradient"
                                gradient={{ from: "pink", to: "yellow" }}
                            >
                                Interuption
                            </Text>{" "}
                            Managment System
                        </Title>

                        <Text className={classes.description} mt={30}>
                            Power breakdown notification and high consumption
                            notifire for Distribution line. Individual Project
                            Semester 4
                        </Text>

                        <Button
                            variant="gradient"
                            gradient={{ from: "pink", to: "yellow" }}
                            size="xl"
                            onClick={() => {
                                navigate("/auth/signin");
                            }}
                            className={classes.control}
                            mt={40}
                        >
                            Login
                        </Button>
                    </div>
                </div>
            </Container>
        </div>
    );
}
