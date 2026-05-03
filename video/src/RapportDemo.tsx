import {AbsoluteFill, Sequence} from 'remotion';
import {Intro} from './scenes/Intro';
import {ProblemScene} from './scenes/ProblemScene';
import {DigestScene} from './scenes/DigestScene';
import {OpenDraftScene} from './scenes/OpenDraftScene';
import {Outro} from './scenes/Outro';

// Scene timing (frames at 30fps)
// Intro:      0  –  90  (3s)
// Problem:   90  – 210  (4s)
// Digest:   210  – 570  (12s)
// OpenDraft:570  – 750  (6s)
// Outro:    750  – 900  (5s)

export const RapportDemo = () => {
	return (
		<AbsoluteFill style={{background: '#f8fafc', fontFamily: "'Plus Jakarta Sans', sans-serif"}}>
			<Sequence from={0} durationInFrames={90}>
				<Intro />
			</Sequence>
			<Sequence from={90} durationInFrames={120}>
				<ProblemScene />
			</Sequence>
			<Sequence from={210} durationInFrames={360}>
				<DigestScene />
			</Sequence>
			<Sequence from={570} durationInFrames={180}>
				<OpenDraftScene />
			</Sequence>
			<Sequence from={750} durationInFrames={150}>
				<Outro />
			</Sequence>
		</AbsoluteFill>
	);
};
