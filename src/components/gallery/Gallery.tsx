import { component$, useStyles$ } from "@qwik.dev/core";
import style from './Gallery.css?inline';

export default component$(() => {
	useStyles$(style);
	return (
		<section id="gallery">
			<figure style="--index:1">
				<figcaption>Terrasse bois</figcaption>
				<img loading="lazy" src="/imgs/home/photo-1.webp" alt="Ouvrage de menuiserie" height="300" />
			</figure>
			<figure style="--index:2">
				<figcaption>Soutènement bois</figcaption>
				<img loading="lazy" src="/imgs/home/photo-2.webp" alt="Ouvrage de menuiserie" height="300" />
			</figure>
			<figure style="--index:3">
				<figcaption>Persiennes</figcaption>
				<img loading="lazy" src="/imgs/home/photo-3.webp" alt="Ouvrage de menuiserie" height="300" />
			</figure>
		</section>
	)
});