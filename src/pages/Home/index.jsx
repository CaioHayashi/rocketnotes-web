import { ButtonText } from "../../components/ButtonText";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Container, Brand, Menu, Search, Content, NewNote } from "./styles";
import { FiPlus, FiSearch } from "react-icons/fi";
import { Section } from "../../components/Section";
import { Note } from "../../components/Note";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";

export const Home = () => {
	const [tags, setTags] = useState([]);
	const [tagsSelected, setTagsSelected] = useState([]);
	const [search, setSearch] = useState("");
	const [notes, setNotes] = useState([]);

	const navegate = useNavigate()

	useEffect(() => {
		const fetchTags = async () => {
			const response = await api.get("/tags");
			setTags(response.data);
		};

		fetchTags();
	}, []);

	useEffect(() => {
		const fetchNotes = async () => {
			const response = await api.get(
				`/notes?title=${search}&tags=${tagsSelected}`
			);

			setNotes(response.data)
		};

		fetchNotes()
	}, [search, tagsSelected]);

	const handleTagsSelected = (tagName) => {
		const alreadySelected = tagsSelected.includes(tagName);

		if(tagName == 'all') {
			setTagsSelected([])
			return
		}

		if (alreadySelected) {
			const filteredTags = tagsSelected.filter((tag) => tag !== tagName);

			setTagsSelected(filteredTags);
		} else {
			setTagsSelected((prevState) => [...prevState, tagName]);
		}
	};

	const handleDetails = (id) => {
		navegate(`/details/${id}`)
	}

	return (
		<Container>
			<Brand>
				<h1>Rocketnotes</h1>
			</Brand>
			<Header />

			<Menu>
				<li>
					<ButtonText
						title="Todos"
						onClick={() => handleTagsSelected("all")}
						isActive={tagsSelected.length === 0}
					/>
				</li>
				{tags &&
					tags.map((tag) => (
						<li key={tag.id}>
							<ButtonText
								title={tag.name}
								onClick={() => handleTagsSelected(tag.name)}
								isActive={tagsSelected.includes(tag.name)}
							/>
						</li>
					))}
			</Menu>

			<Search>
				<Input
					placeholder="Pesquisar pelo título"
					icon={FiSearch}
					onChange={(e) => setSearch(e.target.value)}
				/>
			</Search>

			<Content>
				<Section title="Minhas Notas">
					{notes.map((note) => (
						<Note key={note.id} data={note} onClick={() => handleDetails(note.id)}/>
					))}
				</Section>
			</Content>

			<NewNote to="/new">
				<FiPlus />
				Criar Nota
			</NewNote>
		</Container>
	);
};
