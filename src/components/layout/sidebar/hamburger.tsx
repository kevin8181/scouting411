import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export function Hamburger() {
	return (
		<button className="cursor-pointer xl:hidden" aria-label="Toggle sidebar">
			<FontAwesomeIcon icon={faBars} size="lg" />
		</button>
	);
}
