import {AbsoluteFill, Sequence} from 'remotion';
import {Intro} from './scenes/Intro';
import {ProblemScene} from './scenes/ProblemScene';
import {DigestScene} from './scenes/DigestScene';
import {OpenDraftScene} from './scenes/OpenDraftScene';
import {Outro} from './scenes/Outro';

// Scene timing (frames at 30fps)
// Intro:       0  –  90  (3s)
// Problem:    90  – 330  (8s)
// Digest:    330  – 840  (17s)
// OpenDraft: 840  – 1170 (11s)
// Outro:    1170  – 1500 (11s)

export const RapportDemo = () => {
	return (
		<AbsoluteFill style={{background: '#f8fafc', fontFamily: "'Plus Jakarta Sans', sans-serif"}}>
			<Sequence from={0} durationInFrames={90}>
				<Intro />
			</Sequence>
			<Sequence from={90} durationInFrames={240}>
				<ProblemScene />
			</Sequence>
			<Sequence from={330} durationInFrames={510}>
				<DigestScene />
			</Sequence>
			<Sequence from={840} durationInFrames={330}>
				<OpenDraftScene />
			</Sequence>
			<Sequence from={1170} durationInFrames={330}>
				<Outro />
			</Sequence>
		</AbsoluteFill>
	);
};
