import React, { useEffect, useState } from "react";
import {
    createStyles,
    ThemeIcon,
    Progress,
    Text,
    Group,
    Badge,
    Paper,
} from "@mantine/core";
import { IconRouter } from "@tabler/icons";

import io from "socket.io-client";

const socket = io(`http://localhost:5050`);

const ICON_SIZE = 60;

const useStyles = createStyles((theme) => ({
    card: {
        position: "relative",
        overflow: "visible",
        padding: theme.spacing.xl,
        paddingTop: theme.spacing.xl * 1.5 + ICON_SIZE / 3,
    },

    icon: {
        position: "absolute",
        top: -ICON_SIZE / 3,
        left: `calc(50% - ${ICON_SIZE / 2}px)`,
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        lineHeight: 1,
    },
}));

function Dashboard() {
    const { classes } = useStyles();
    const [items, setitem] = useState([]);

    useEffect(() => {
        const socket = io(`power-interruption-management.herokuapp.com`);
        socket.on("device", (data) => {
            setitem(data);
        });

        return () => {
            socket.off("connect");
            socket.off("disconnect");
            socket.off("pong");
        };
    }, []);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {items &&
                items.map((item, index) => {
                    return (
                        <Paper
                            key={index}
                            radius="md"
                            withBorder
                            className={classes.card}
                            mt={ICON_SIZE / 3}
                        >
                            <ThemeIcon
                                className={classes.icon}
                                size={ICON_SIZE}
                                radius={ICON_SIZE}
                            >
                                <IconRouter size={34} stroke={1.5} />
                            </ThemeIcon>

                            <Text
                                align="center"
                                weight={700}
                                className={classes.title}
                            >
                                {item.devID}
                            </Text>
                            <Text color="dimmed" align="center" size="sm">
                                {item.region}
                            </Text>

                            <Group position="apart" mt="xs">
                                <Text size="sm" color="dimmed">
                                    Load percentage
                                </Text>
                                <Text size="sm" color="dimmed">
                                    {item.highConsumtions &&
                                        Math.round(
                                            (item.highConsumtions.count / 10) *
                                                100
                                        )}{" "}
                                    %
                                </Text>
                            </Group>

                            <Progress
                                value={
                                    item.highConsumtions &&
                                    (item.highConsumtions.count / 10) * 100
                                }
                                mt={5}
                            />

                            <Group position="apart" mt="md">
                                <Badge
                                    size="sm"
                                    color={
                                        !item.isunderBreakdown ? "blue" : "red"
                                    }
                                >
                                    {item.isunderBreakdown
                                        ? "Under breakdown"
                                        : "Running"}
                                </Badge>
                            </Group>
                        </Paper>
                    );
                })}
        </div>
    );
}

export default Dashboard;
