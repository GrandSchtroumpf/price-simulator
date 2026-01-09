import { component$, useStyles$ } from "@qwik.dev/core";
import style from './Gallery.css?inline';

export default component$(() => {
	useStyles$(style);
	return (
		<section id="gallery">
			<figure style="--index:1">
				<figcaption>Nantes</figcaption>
				<img loading="lazy" src="/imgs/home/carpentry.webp" alt="Ouvrage de menuiserie" height="300" />
			</figure>
			<figure style="--index:2">
				<figcaption>Redon</figcaption>
				<img loading="lazy" src="/imgs/home/carpentry.webp" alt="Ouvrage de menuiserie" height="300" />
			</figure>
			<figure style="--index:3">
				<figcaption>Saint Nazaire</figcaption>
				<img loading="lazy" src="/imgs/home/carpentry.webp" alt="Ouvrage de menuiserie" height="300" />
			</figure>
		</section>
	)
});