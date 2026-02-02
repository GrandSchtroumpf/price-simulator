import { component$, useStyles$ } from "@qwik.dev/core";
import style from './Footer.css?inline';
import { Logo } from "../logo/Logo";

export default component$(() => {
	useStyles$(style);
	return (
		<footer class="main-footer">
			<section class="footer-top">
				<figure>
					<Logo width="80" height="80"/>
					<figcaption>Erwan RICHARD Menuisier</figcaption>
				</figure>

				<address>
					<a href="mailto:erwanrichard.lpm@gmail.com">erwanrichard.lpm@gmail.com</a>
					<a href="tel:+33660791386">06 60 79 13 86</a>
				</address>
			</section>

			<hr />

			<nav>
				<a href="#gallery">Mes réalisations</a>
				<a href="/simulateur">Simuler un devis</a>
			</nav>
		</footer>
	)
}); 