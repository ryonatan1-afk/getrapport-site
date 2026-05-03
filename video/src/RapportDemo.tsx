import {AbsoluteFill, Sequence} from 'remotion';
import {Intro} from './scenes/Intro';
import {ProblemScene} from './scenes/ProblemScene';
import {DigestScene} from './scenes/DigestScene';
import {OpenDraftScene} from './scenes/OpenDraftScene';
import {Outro} from './scenes/Outro';

// Scene timing (frames at 30fps)
// Intro:        0  – 150  (5s)
// Problem:    150  – 510  (12s)
// Digest:     510  – 1200 (23s)
// OpenDraft: 1200  – 1680 (16s)
// Outro:     1680  – 2100 (14s)

export const RapportDemo = () => {
	return (
		<AbsoluteFill style={{background: '#f8fafc', fontFamily: "'Plus Jakarta Sans', sans-serif"}}>
			<Sequence from={0} durationInFrames={150}>
				<Intro />
			</Sequence>
			<Sequence from={150} durationInFrames={360}>
				<ProblemScene />
			</Sequence>
			<Sequence from={510} durationInFrames={690}>
				<DigestScene />
			</Sequence>
			<Sequence from={1200} durationInFrames={480}>
				<OpenDraftScene />
			</Sequence>
			<Sequence from={1680} durationInFrames={420}>
				<Outro />
			</Sequence>
		</AbsoluteFill>
	);
};
