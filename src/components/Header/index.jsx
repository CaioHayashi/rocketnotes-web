import { useAuth } from "../../hooks/auth";
import { Container, Profile, Logout } from "./styles";
import { RiShutDownLine } from "react-icons/ri";

export const Header = () => {
	const {signOut} = useAuth()

	return (
		<Container>
			<Profile to="/profile">
				<img src="https://github.com/rodrigorgtic.png" alt="foto do usuário" />
				<div>
					<span>Bem Vindo</span>
					<strong>Rodrigo Gonsalves</strong>
				</div>
			</Profile>
			<Logout>
				<RiShutDownLine onClick={signOut}/>
			</Logout>
		</Container>
	);
};
