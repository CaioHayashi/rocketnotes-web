import { Container, Form } from "./styles";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { TextArea } from "../../components/TextArea";
import { Section } from "../../components/Section";
import { NoteItem } from "../../components/NoteItem";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../../services/api";
import { ButtonText } from "../../components/ButtonText";

export const New = () => {
	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")

	const [links, setLinks] = useState([]);
	const [newLink, setNewLink] = useState("");

	const [tags, setTags] = useState([]);
	const [newTag, setNewTag] = useState("");

	const navegate = useNavigate()

	const handleAddLink = () => {
		setLinks((prevState) => [...prevState, newLink]);
		setNewLink("");
	};

	const handleRemoveLink = (index) => {
		setLinks((prevState) => prevState.filter((_, idx) => idx !== index));
	};

	const handleAddTag = () => {
		setTags((prevState) => [...prevState, newTag]);
		setNewTag("");
	};

	const handleRemoveTag = (index) => {
		setTags((prevState) => prevState.filter((_, idx) => idx !== index));
	};

	const handleNewNote = async () => {

		if(!title) {
			return alert('Informe um título para a nota')
		}

		if(newLink) {
			return alert('Você escreveu um link, clique em adicionar ou deixe o campo vazio.')
		}

		if (newTag) {
			return alert(
				"Você escreveu uma tag, clique em adicionar ou deixe o campo vazio."
			);
		}

		await api.post('/notes', {
			title, 
			description, 
			links, 
			tags
		})

		alert('Nota criada com sucesso!')
		navegate(-1)
	}

	const handleBack = () => {
		navegate(-1);
	};

	return (
		<Container>
			<Header />

			<main>
				<Form>
					<header>
						<h1>Criar nota</h1>
						<ButtonText title="Voltar" onClick={handleBack} />
					</header>

					<Input
						placeholder="Título"
						onChange={(e) => setTitle(e.target.value)}
					/>
					<TextArea
						placeholder="Observações"
						onChange={(e) => setDescription(e.target.value)}
					/>

					<Section title="Links úteis">
						{links?.map((link, index) => (
							<NoteItem
								key={String(index)}
								value={link}
								onClick={() => {
									handleRemoveLink(index);
								}}
							/>
						))}

						<NoteItem
							isNew
							placeholder="Novo Link"
							value={newLink}
							onChange={(e) => setNewLink(e.target.value)}
							onClick={handleAddLink}
						/>
					</Section>
					<Section title="Marcadores">
						<div className="tags">
							{tags?.map((tag, index) => (
								<NoteItem
									key={String(index)}
									value={tag}
									onClick={() => handleRemoveTag(index)}
								/>
							))}
							<NoteItem
								isNew
								placeholder="Nova tag"
								value={newTag}
								onChange={(e) => setNewTag(e.target.value)}
								onClick={handleAddTag}
							/>
						</div>
					</Section>

					<Button title="Salvar" onClick={handleNewNote} />
				</Form>
			</main>
		</Container>
	);
};
