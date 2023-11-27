import { Container, Links, Content } from "./styles";

import { Header } from "../../components/Header";
import { Section } from "../../components/Section";
import { ButtonText } from "../../components/ButtonText";
import { Button } from "../../components/Button";
import { Tag } from "../../components/Tag";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";

export const Details = () => {
	const [data, setData] = useState();
	const params = useParams();

	const navegate = useNavigate();

	const handleBack = () => {
		navegate(-1);
	};

	const handleRemoveNote = async () => {
		const confirm = window.confirm("Deseja realmente deletar essa nota?");

		if (confirm) {
			await api.delete(`/notes/${params.id}`);
			navegate(-1);
		}
	};

	useEffect(() => {
		const fetchNote = async () => {
			const response = await api.get(`/notes/${params.id}`);
			setData(response.data);
		};

		fetchNote();
	}, [params.id]);

	return (
		<Container>
			<Header />

			{data && (
				<main>
					<Content>
						<ButtonText title="excluir nota" onClick={handleRemoveNote} />

						<h1>{data.title}</h1>

						<p>{data.description}</p>

						{data.links && (
							<Section title="Links Úteis">
								{data.links.map((link) => (
									<Links key={String(link.id)}>
										<li>
											<a href={link.url} target="_blank" rel="noreferrer">
												{link.url}
											</a>
										</li>
									</Links>
								))}
							</Section>
						)}
						{data.tags && (
							<Section title="Marcadores">
								{data.tags.map((tags) => (
									<Tag key={String(tags.id)} title={tags.name} />
								))}
							</Section>
						)}

						<Button title="Voltar" onClick={handleBack} />
					</Content>
				</main>
			)}
		</Container>
	);
};
