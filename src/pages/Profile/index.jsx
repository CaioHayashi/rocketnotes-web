import { useState } from "react";
import { Container, Form, Avatar } from "./styles";
import { FiArrowLeft, FiUser, FiLock, FiMail, FiCamera } from "react-icons/fi";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Link } from "react-router-dom";

import { useAuth } from "../../hooks/auth";

export const Profile = () => {
	const { user, updateProfile } = useAuth();

	const [name, setName] = useState(user.name);
	const [email, setEmail] = useState(user.email);
	const [passwordOld, setPasswordOld] = useState();
	const [passwordNew, setPasswordNew] = useState();

	const handleUpdateProfile = async () => {
		const user = {
			name,
			email,
			password: passwordNew,
			old_password: passwordOld
		}

		await updateProfile({user})
	};

	return (
		<Container>
			<header>
				<Link to="/">
					<FiArrowLeft />
				</Link>
			</header>
			<Form>
				<Avatar>
					<img
						src="https://github.com/rodrigorgtic.png"
						alt="Foto do usuário"
					/>
					<label htmlFor="avatar">
						<FiCamera />
						<input id="avatat" type="file" />
					</label>
				</Avatar>
				<Input
					placeholder="Nome"
					type="text"
					icon={FiUser}
					onChange={(e) => setName(e.target.value)}
				/>
				<Input
					placeholder="E-mail"
					type="text"
					icon={FiMail}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<Input
					placeholder="Senha atual"
					type="password"
					icon={FiLock}
					onChange={(e) => setPasswordOld(e.target.value)}
				/>
				<Input
					placeholder="Nova senha"
					type="password"
					icon={FiLock}
					onChange={(e) => setPasswordNew(e.target.value)}
				/>
				<Button title="Salvar" onClick={handleUpdateProfile} />
			</Form>
		</Container>
	);
};