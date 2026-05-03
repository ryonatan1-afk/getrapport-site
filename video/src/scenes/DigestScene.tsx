import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

const contacts = [
	{
		name: 'Priya Sharma',
		holiday: 'Diwali · Mon 28 Oct',
		badge: 'in 3 days',
		badgeBg: '#fefce8',
		badgeColor: '#92400e',
		badgeBorder: '#fde68a',
		preview: '"Hi Priya, I wanted to take a moment to wish you and your family a joyful and bright Diwali…"',
	},
	{
		name: 'Carlos Mendez',
		holiday: 'Día de los Muertos · Fri 1 Nov',
		badge: 'in 7 days',
		badgeBg: '#f8fafc',
		badgeColor: '#475569',
		badgeBorder: '#e2e8f0',
		preview: '"Carlos, I\'m reaching out ahead of Día de los Muertos to wish you and yours a warm…"',
	},
];

const ContactCard = ({contact, delay, highlight}: {contact: typeof contacts[0]; delay: number; highlight: boolean}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const cardScale = spring({frame: frame - delay, fps, config: {damping: 16, stiffness: 160}});
	const opacity = interpolate(frame, [delay, delay + 15], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	return (
		<div style={{
			opacity,
			transform: `scale(${interpolate(cardScale, [0, 1], [0.92, 1])})`,
			background: highlight ? '#f0f9ff' : '#f8fafc',
			border: `1.5px solid ${highlight ? '#bae6fd' : '#e2e8f0'}`,
			borderRadius: 14,
			padding: '16px 18px',
			marginBottom: 10,
		}}>
			<div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8}}>
				<div>
					<div style={{fontSize: 14, fontWeight: 700, color: '#0f172a'}}>{contact.name}</div>
					<div style={{fontSize: 12, color: '#0369a1', fontWeight: 600, marginTop: 2}}>{contact.holiday}</div>
				</div>
				<span style={{
					fontSize: 10,
					background: contact.badgeBg,
					color: contact.badgeColor,
					border: `1px solid ${contact.badgeBorder}`,
					padding: '3px 9px',
					borderRadius: 100,
					fontWeight: 700,
					whiteSpace: 'nowrap',
				}}>{contact.badge}</span>
			</div>
			<div style={{fontSize: 12, color: '#64748b', fontStyle: 'italic', lineHeight: 1.5, marginBottom: 10}}>
				{contact.preview}
			</div>
			<div style={{
				display: 'inline-flex',
				alignItems: 'center',
				gap: 6,
				fontSize: 11,
				fontWeight: 700,
				color: '#0369a1',
				background: '#f0f9ff',
				border: '1px solid #bae6fd',
				padding: '5px 12px',
				borderRadius: 8,
			}}>
				✉ Open draft
			</div>
		</div>
	);
};

export const DigestScene = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const emailSlide = spring({frame, fps, config: {damping: 18, stiffness: 90}});
	const labelOpacity = interpolate(frame, [0, 10], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const fadeOut = interpolate(frame, [95, 120], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	const emailX = interpolate(emailSlide, [0, 1], [80, 0]);

	return (
		<AbsoluteFill style={{background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: fadeOut}}>
			<div style={{display: 'flex', alignItems: 'center', gap: 70, width: '100%', padding: '0 80px'}}>

				{/* Left: explanation */}
				<div style={{flex: 1, opacity: labelOpacity}}>
					<div style={{fontSize: 12, fontWeight: 700, color: '#0369a1', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16}}>
						Every Monday · 7 am
					</div>
					<div style={{fontSize: 32, fontWeight: 800, color: '#0f172a', lineHeight: 1.2, marginBottom: 20}}>
						Your digest lands<br/>in your inbox.
					</div>
					<div style={{fontSize: 15, color: '#64748b', lineHeight: 1.7, marginBottom: 28}}>
						Every contact with an upcoming holiday.<br/>
						Every message already written.<br/>
						One email. Done.
					</div>
					<div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
						{['14-day lookahead window', '50+ countries covered', 'AI-personalised — not a template'].map((f) => (
							<div key={f} style={{display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: '#475569', fontWeight: 500}}>
								<div style={{width: 20, height: 20, borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#16a34a', fontWeight: 700, flexShrink: 0}}>✓</div>
								{f}
							</div>
						))}
					</div>
				</div>

				{/* Right: email digest mockup */}
				<div style={{
					width: 360,
					transform: `translateX(${emailX}px)`,
					background: 'white',
					borderRadius: 18,
					border: '1.5px solid #e2e8f0',
					boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
					overflow: 'hidden',
					flexShrink: 0,
				}}>
					{/* Email chrome */}
					<div style={{background: '#1e293b', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 6}}>
						<div style={{width: 10, height: 10, borderRadius: '50%', background: '#f87171'}}/>
						<div style={{width: 10, height: 10, borderRadius: '50%', background: '#fbbf24'}}/>
						<div style={{width: 10, height: 10, borderRadius: '50%', background: '#34d399'}}/>
						<div style={{flex: 1, background: '#334155', borderRadius: 4, padding: '3px 10px', marginLeft: 8}}>
							<div style={{fontSize: 10, color: '#94a3b8'}}>digest@getrapport.app</div>
						</div>
					</div>
					{/* Email body */}
					<div style={{padding: 18}}>
						<div style={{display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, paddingBottom: 14, borderBottom: '1px solid #f1f5f9'}}>
							<div style={{width: 36, height: 36, borderRadius: '50%', background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0}}>📬</div>
							<div>
								<div style={{fontSize: 12, fontWeight: 700, color: '#0f172a'}}>Your Rapport digest</div>
								<div style={{fontSize: 11, color: '#94a3b8', marginTop: 2}}>Monday · 3 contacts this week</div>
							</div>
						</div>
						{contacts.map((c, i) => (
							<ContactCard key={c.name} contact={c} delay={20 + i * 30} highlight={i === 0} />
						))}
						<div style={{fontSize: 11, color: '#94a3b8', textAlign: 'center', marginTop: 8}}>+ 1 more in this digest</div>
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
};
