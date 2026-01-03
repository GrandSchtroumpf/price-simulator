import { component$ } from "@qwik.dev/core";

export default component$(() => {

	return (
		<footer class="main-footer">
			<section class="footer-top">
				<figure>
					<img
							src="/favicon.svg"
							width="80"
							height="80"
							alt="Représentation d'un blason contenant deux marteaux"
					/>
					<figcaption>Erwan RICHARD Menuisier</figcaption>
				</figure>

				<address>
					<a href="mailto:toto@example.fr">erwan@example.fr</a>
					<a href="tel:+33123456789">+33 00 00 00 00</a>
				</address>
			</section>

			<hr />

			<nav>
				<a href="#">Mes réalisations</a>
				<a href="#">Simuler un devis</a>
			</nav>
		</footer>
	)
}); 