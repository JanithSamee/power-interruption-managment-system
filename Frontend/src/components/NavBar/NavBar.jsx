import { useState } from "react";
import {
    Navbar,
    Center,
    Tooltip,
    UnstyledButton,
    createStyles,
    Stack,
} from "@mantine/core";
import {
    Home2,
    Gauge,
    DeviceDesktopAnalytics,
    Fingerprint,
    CalendarStats,
    User,
    Settings,
    Logout,
    SwitchHorizontal,
} from "tabler-icons-react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/main_logo.svg";

const useStyles = createStyles((theme) => ({
    link: {
        width: 50,
        height: 50,
        borderRadius: theme.radius.md,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color:
            theme.colorScheme === "dark"
                ? theme.colors.dark[0]
                : theme.colors.gray[7],

        "&:hover": {
            backgroundColor:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[5]
                    : theme.colors.gray[0],
        },
    },

    active: {
        "&, &:hover": {
            backgroundColor: theme.fn.variant({
                variant: "light",
                color: theme.primaryColor,
            }).background,
            color: theme.fn.variant({
                variant: "light",
                color: theme.primaryColor,
            }).color,
        },
    },
}));

function NavbarLink({ Icon, label, active, onClick, link }) {
    const { classes, cx } = useStyles();
    return (
        <NavLink to={link || "/"}>
            <Tooltip label={label} position="right" transitionDuration={0}>
                <UnstyledButton
                    onClick={onClick}
                    className={cx(classes.link, { [classes.active]: active })}
                >
                    <Icon />
                </UnstyledButton>
            </Tooltip>
        </NavLink>
    );
}

const mockdata = [
    { icon: Home2, label: "Home", link: "/" },
    { icon: Gauge, label: "Dashboard", link: "/dashboard" },
    { icon: DeviceDesktopAnalytics, label: "Analytics" },
    { icon: CalendarStats, label: "Releases" },
    { icon: User, label: "Account", link: "/account" },
    { icon: Fingerprint, label: "Security" },
    { icon: Settings, label: "Settings" },
];

export default function NavBar() {
    const [active, setActive] = useState(2);

    const links = mockdata.map((link, index) => (
        <NavbarLink
            Icon={link.icon}
            key={link.label}
            active={index === active}
            onClick={() => setActive(index)}
            link={link.link}
        />
    ));

    return (
        <Navbar height={750} width={{ base: 80 }} p="md">
            <Center>
                <img src={Logo} alt="Power Intteruption management"></img>
            </Center>
            <Navbar.Section grow mt={50}>
                <Stack justify="center" spacing={0}>
                    {links}
                </Stack>
            </Navbar.Section>
            <Navbar.Section>
                <Stack justify="center" spacing={0}>
                    <NavbarLink
                        Icon={SwitchHorizontal}
                        label="Change account"
                    />
                    <NavbarLink Icon={Logout} label="Logout" />
                </Stack>
            </Navbar.Section>
        </Navbar>
    );
}
