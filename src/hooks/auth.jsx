import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
	const [data, setData] = useState({});

	const signIn = async ({ email, password }) => {
		try {
			const response = await api.post("/sessions", { email, password });
			const { user, token } = response.data;

			localStorage.setItem("@rocketnotes:user", JSON.stringify(user));
			localStorage.setItem("@rocketnotes:token", token);

			api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
			setData({ user, token });
		} catch (error) {
			if (error.response) {
				alert(error.response.data.message);
			} else {
				alert("Não foi possível entrar.");
			}
		}
	};

	const signOut = () => {
		localStorage.removeItem("@rocketnotes:user");
		localStorage.removeItem("@rocketnotes:token");

		setData({});
	};

	const updateProfile = async ({ user, avatarFile }) => {
		try {
			if (avatarFile) {
				const fileUploadForm = new FormData();
				fileUploadForm.append("avatar", avatarFile);

				const response = await api.patch("/users/avatar", fileUploadForm);
				user.avatar = response.data.avatar;
			}

			await api.put("/users", user);
			localStorage.setItem("@rocketnotes:user", JSON.stringify(user));

			setData({ user, token: data.token });
			alert("Perfil atualizado!");
		} catch (error) {
			if (error.response) {
				alert(error.response.data.message);
			} else {
				alert("Não foi possível atualizar o perfil.");
			}
		}
	};

	useEffect(() => {
		const token = localStorage.getItem("@rocketnotes:token");
		const user = localStorage.getItem("@rocketnotes:user");

		if (token && user) {
			api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
		}

		setData({
			token,
			user: JSON.parse(user)
		});
	}, []);

	return (
		<AuthContext.Provider
			value={{
				signIn,
				signOut,
				updateProfile,
				user: data.user
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
const useAuth = () => {
	const context = useContext(AuthContext);

	return context;
};

export { AuthProvider, useAuth };
