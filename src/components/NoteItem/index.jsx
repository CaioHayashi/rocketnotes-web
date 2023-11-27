import { FiPlus, FiX } from "react-icons/fi";

import { Container } from "./styles";

export const NoteItem = ({ isNew = false, value, onClick, ...rest }) => {
	return (
		<Container $isnew={isNew.toString()}>
			<input
				type="text"
				value={value}
				readOnly={!isNew}
				{...rest}
				placeholder="Novo link"
			/>

			<button
				type="button"
				onClick={onClick}
				className={isNew ? "button-add" : "button-delete"}
			>
				{isNew ? <FiPlus /> : <FiX />}
			</button>
		</Container>
	);
};
