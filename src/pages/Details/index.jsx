import { Container, Links,Content } from "./styles";

import { Header } from "../../components/Header";
import { Section } from "../../components/Section";
import { ButtonText } from "../../components/ButtonText";
import { Button } from "../../components/Button";
import { Tag } from "../../components/Tag";

export const Details = () => {
	return (
		<Container>
			<Header />

			<main>
				<Content>
					<ButtonText title="excluir nota" />

					<h1>Introdução ao React</h1>

					<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores at tempore repellat voluptatum culpa vero tenetur cum pariatur! Dolore iste rem ipsam sapiente nostrum eos repellat fugiat ab, odio officiis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo ipsa, consequatur itaque veniam porro voluptatibus. Vero doloremque dolores necessitatibus fugit, ratione labore dolor fugiat reprehenderit vel adipisci, nihil a odio.</p>
					<Section title="Links Úteis">
						<Links>
							<li>
								<a href="#" target="_blank">
									https://github.com/caiohayashi
								</a>
							</li>
							<li>
								<a href="#" target="_blank">
									https://github.com/caiohayashi
								</a>
							</li>
						</Links>
					</Section>

					<Section title="Marcadores">
						<Tag title="express" />
						<Tag title="node" />
					</Section>

					<Button title="Voltar" />
				</Content>
			</main>
		</Container>
	);
};
