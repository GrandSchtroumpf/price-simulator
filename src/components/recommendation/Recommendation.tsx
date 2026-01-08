import { component$, useStyles$ } from "@qwik.dev/core";
import style from './Recommendation.css?inline';

export default component$(() => {
	useStyles$(style);

	return (
		<section class="recommendation">
			<h2>Avis clients</h2>

			<div class="worker-img">
				<img loading="lazy" src="/imgs/home/worker.webp" alt="Photographie de Erwan Richard travaillant le bois dans son atelier" />
			</div>

			<ul style="--index: 0">
				<li>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita quidem tempora deleniti accusantium aut praesentium? Dolorem sint debitis illo ratione. Fuga saepe nihil obcaecati officia distinctio vel inventore rerum deserunt.</p>
					<hr />
					<img loading="lazy" src="/imgs/home/placeholder.webp" width="56" height="56" alt="Photo de profil" />
					<hgroup>
						<h3>Société DOE</h3>
						<p>Travaux effectués le 13 octobre 2012</p>
					</hgroup>
				</li>
				<li style="--index: 1">
					<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis voluptatem voluptatum ducimus incidunt, repudiandae doloremque quas suscipit dolor similique omnis deleniti excepturi non consectetur dolore repellat saepe aspernatur numquam? Quas.</p>
					<hr />
					<img loading="lazy" src="/imgs/home/placeholder.webp" width="56" height="56" alt="Photo de profil" />
					<hgroup>
						<h3>John DOE</h3>
						<p>Travaux non effectués en janvier 2026</p>
					</hgroup>
				</li>
				<li style="--index: 2">
					<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, et. Temporibus sint ratione ea doloribus explicabo aspernatur magni suscipit beatae, voluptatem quod, ut neque voluptates rem eaque. Mollitia, nam eaque!</p>
					<hr />
					<img loading="lazy" src="/imgs/home/placeholder.webp" width="56" height="56" alt="Photo de profil" />
					<hgroup>
						<h3>Jane DOE</h3>
						<p>Travaux réalisés en janvier 2025</p>
					</hgroup>
				</li>
				<li style="--index: 3">
					<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos nulla, sed laboriosam doloremque iure dolores sequi laborum ut fugit quas ad veniam incidunt voluptatibus porro maxime quod hic voluptatum rem.</p>
					<hr />
					<img loading="lazy" src="/imgs/home/placeholder.webp" width="56" height="56" alt="Photo de profil" />
					<hgroup>
						<h3>Nicolas MICHEL</h3>
						<p>Travaux réalisés en février 2023</p>
					</hgroup>
				</li>
				<li style="--index: 4">
					<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis saepe harum, dolore culpa omnis quae vel in dolorem voluptatibus quis rerum, magni, at obcaecati voluptates quos soluta incidunt nisi officiis!</p>
					<hr />
					<img loading="lazy" src="/imgs/home/placeholder.webp" width="56" height="56" alt="Photo de profil" />
					<hgroup>
						<h3>Baptiste LE PABIC</h3>
						<p>Travaux réalisés en janvier 2026</p>
					</hgroup>
				</li>
			</ul>
		</section>
	)
});