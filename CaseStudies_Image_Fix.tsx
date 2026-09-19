import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

const COLORS = {
  bg: "#F6F4EE",
  paper: "#FFFFFF",
  text: "#141414",
  muted: "#6E6A62",
  line: "rgba(20,20,20,0.14)",
  red: "#E5352F",
  redSoft: "#F6D7D4",
}

const CaseImageContext = React.createContext<Record<string, string | undefined>>({})

function useCaseImages() {
  return React.useContext(CaseImageContext)
}

const nextCase = {
  speak: { title: "Skill Bazaar", href: "/skill-bazaar" },
  skill: { title: "Flames of the Forgotten", href: "/flames-of-the-forgotten" },
  flames: { title: "Experience of First Encounter with Health Care", href: "/first-encounter-healthcare" },
  health: { title: "Speak Up", href: "/speak-up" },
}

function Nav() {
  return (
    <nav className="cs-nav">
      <a href="/" className="cs-brand">A work in progress</a>
      <div className="cs-nav-links">
        <a href="/">Home</a>
        <a href="/work">Work</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </div>
    </nav>
  )
}

function Top({ label, title, subtitle, tags, researchLink }: {
  label: string
  title: string
  subtitle: string
  tags: string[]
  researchLink?: string
}) {
  return (
    <header className="cs-top">
      <div className="cs-back"><a href="/work">← Back to Work</a><span>Case study</span></div>
      <div className="cs-tags">{tags.map((tag) =><span key={tag}>{tag}</span>)}</div>
      <h1>{title}</h1>
      <p className="cs-subtitle">{subtitle}</p>
      {researchLink ? <a className="cs-research" href={researchLink}>Research document ↗</a> : null}
    </header>
  )
}

function ImagePlaceholder({ label }: { label: string }) {
  return (
    <div className="image-placeholder">
      <span>{label}</span>
      <small>Upload this image in the Framer property panel.</small>
    </div>
  )
}

function ManagedImage({ src, alt, className = "", label }: { src?: string, alt: string, className?: string, label: string }) {
  const [failed, setFailed] = React.useState(false)

  React.useEffect(() => {
    setFailed(false)
  }, [src])

  if (!src || failed) return <ImagePlaceholder label={label} />

  return (
    <img
      className={className}
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      decoding="async"
    />
  )
}

function HeroImage({ src, alt, className = "", label }: { src?: string, alt: string, className?: string, label?: string }) {
  return (
    <ManagedImage
      src={src}
      alt={alt}
      className={`cs-hero-image ${className}`}
      label={label || alt}
    />
  )
}

function SuppliedImage({ src, alt, label }: { src?: string, alt: string, label: string }) {
  return <ManagedImage src={src} alt={alt} className="supplied-image" label={label} />
}

function SectionTitle({ number, eyebrow, title }: { number: string, eyebrow?: string, title: string }) {
  return (
    <div className="section-title">
      <div className="section-number">{number}</div>
      <div>
        {eyebrow ? <div className="eyebrow">{eyebrow}</div> : null}
        <h2>{title}</h2>
      </div>
    </div>
  )
}

function Body({ children }: { children: React.ReactNode }) {
  return <div className="body-copy">{children}</div>
}

function MetaGrid({ items }: { items: Array<{ label: string, value: string }> }) {
  return (
    <div className="meta-grid">
      {items.map((item) => (
        <div className="meta-item" key={item.label}>
          <div className="meta-label">{item.label}</div>
          <div className="meta-value">{item.value}</div>
        </div>
      ))}
    </div>
  )
}

function Index({ items }: { items: Array<{ id: string, label: string }> }) {
  return (
    <div className="contents">
      <div className="contents-label">Inside this case study</div>
      <div className="contents-links">
        {items.map((item) =><a key={item.id} href={`#${item.id}`}>{item.label}</a>)}
      </div>
    </div>
  )
}

function Journey({ items }: { items: Array<{ title: string, description: string, state: string, opportunity: string }> }) {
  return (
    <div className="journey-grid">
      {items.map((item, index) => (
        <article className="journey-card" key={item.title}>
          <div className="journey-index">0{index + 1}</div>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <div className="journey-state">{item.state}</div>
          <div className="opportunity-label">Opportunity</div>
          <p className="opportunity-copy">{item.opportunity}</p>
        </article>
      ))}
    </div>
  )
}

function CompareTable({ rows, headers }: { rows: string[][], headers: string[] }) {
  return (
    <div className="table-wrap">
      <table>
        <thead><tr>{headers.map((header) =><th key={header}>{header}</th>)}</tr></thead>
        <tbody>
          {rows.map((row, i) =><tr key={i}>{row.map((cell, j) =><td key={j}>{cell}</td>)}</tr>)}
        </tbody>
      </table>
    </div>
  )
}

function VisualGrid({ images }: { images: Array<{ src?: string, alt: string, label: string }> }) {
  return (
    <div className="visual-grid">
      {images.map((image) => (
        <figure key={image.label}>
          <ManagedImage src={image.src} alt={image.alt} label={image.label} />
          <figcaption>{image.label}</figcaption>
        </figure>
      ))}
    </div>
  )
}

function PhoneScreen({ src, alt, label }: { src?: string, alt: string, label?: string }) {
  return (
    <div className="phone-stage">
      <ManagedImage src={src} alt={alt} className="phone-screen" label={label || alt} />
    </div>
  )
}

function NextCase({ current }: { current: keyof typeof nextCase }) {
  const item = nextCase[current]
  return (
    <div className="next-wrap">
      <a href={item.href} className="next-case">
        <div>
          <span className="next-label">Next case study</span>
          <strong>{item.title}</strong>
        </div>
        <span className="next-arrow">→</span>
      </a>
    </div>
  )
}

function Footer() {
  return <footer className="cs-footer"><span>Nehal Thakkar</span><span>© 2026</span></footer>
}

function PageShell({ children, current, tags, title, subtitle, researchLink, label = "Case study" }: {
  children: React.ReactNode
  current: keyof typeof nextCase
  tags: string[]
  title: string
  subtitle: string
  researchLink?: string
  label?: string
}) {
  return (
    <main className="case-study-page">
      <Nav />
      <div className="case-study-container">
        <Top label={label} title={title} subtitle={subtitle} tags={tags} researchLink={researchLink} />
        {children}
        <NextCase current={current} />
        <Footer />
      </div>
      <style>{styles}</style>
    </main>
  )
}

function SpeakUp({ aanyaImage, rohanImage, visualStyleImage }: { aanyaImage?: string, rohanImage?: string, visualStyleImage?: string }) {
  const images = useCaseImages()
  return (
    <PageShell
      current="speak"
      tags={["UX research", "Interaction design", "UI design"]}
      title="Speak Up"
      subtitle="Finding the confidence to take part"
    >
      <Index items={[
        { id: "s1", label: "The starting point" },
        { id: "s2", label: "Understanding what makes speaking difficult" },
        { id: "s3", label: "Personas and journeys" },
        { id: "s4", label: "Turning research into a product direction" },
        { id: "s5", label: "Learning from existing approaches" },
        { id: "s6", label: "Designing the practice experience" },
        { id: "s7", label: "Visual language and interface refinement" },
        { id: "s8", label: "What the project currently achieves" },
        { id: "s9", label: "What I would examine next" },
      ]} />

      <section className="hero-band">
        <div className="experience-heading">
          <h2>A little practice.<br />A little more confidence.</h2>
          <p>Prepare at your own pace. Find your voice. Take the next step into a conversation.</p>
        </div>
        <div className="hero-image-grid">
          <HeroImage src={images["speak-home.png"]} alt="Speak Up home screen" label="Speak Up / Home" />
          <HeroImage src={images["speak-arena.png"]} alt="Speak Up practice arena screen" label="Speak Up / Arena" />
        </div>
      </section>

      <section className="case-section">
        <SectionTitle number="Overview" title="The project at a glance" />
        <div className="problem-grid">
          <div><span>01</span><h3>The problem</h3><p>People can prepare an idea yet hesitate when it is time to say it.</p></div>
          <div><span>02</span><h3>The direction</h3><p>A repeatable cycle of preparation, spoken practice and reflection.</p></div>
        </div>
        <Body><p>A communication-practice app exploring how students and young professionals can rehearse difficult conversations, receive feedback and become more comfortable expressing their ideas.</p></Body>
        <MetaGrid items={[
          { label: "Discipline", value: "UX research, interaction design, UI design" },
          { label: "Target audience", value: "Students and young professionals who hesitate in academic, workplace or social conversations" },
        ]} />
      </section>

      <section id="s1" className="case-section">
        <SectionTitle number="01" title="The starting point" />
        <Body>
          <p>Having something valuable to say does not always make it easy to say it. A student may understand an assignment but avoid speaking during a critique. A young professional may prepare thoroughly for a meeting, then struggle to contribute when the conversation moves quickly or a senior colleague asks an unexpected question.</p>
          <p>Speak Up explores the space between knowing what you want to communicate and feeling ready to communicate it. The project asks how a digital tool could offer repeated, manageable practice before people encounter those moments in daily life.</p>
          <p>The initial research explored communication broadly: confidence, language, social expectations, nonverbal cues and the difficulties of digital conversations. The design brief narrowed that territory to a specific opportunity: helping students and young professionals build real-time communication confidence through safe practice.</p>
        </Body>
      </section>

      <section id="s2" className="case-section">
        <SectionTitle number="02" title="Understanding what makes speaking difficult" />
        <Body>
          <p>The research board combines secondary exploration with an interview guide and a summary of interview findings. The guide asks when people feel hesitant, how they respond when they cannot express themselves, what emotions accompany those moments, and what kind of support they find helpful. It also distinguishes internal difficulties, such as confidence, from external conditions, such as language and cultural expectations.</p>
          <p>The recorded findings identify fear of sounding wrong, large groups and formal settings as recurring triggers. Their consequences include self-doubt, missed opportunities and anxiety about academic or professional progress. The needs recorded on the board include realistic practice, peer support, cultural sensitivity and constructive feedback.</p>
          <p>These findings suggest that the intervention needs to address the experience of participation. Providing more tips alone would leave a gap between learning about communication and practising it with another person.</p>
        </Body>
      </section>

      <section id="s3" className="case-section">
        <SectionTitle number="03" title="Making the findings specific through personas and journeys" />
        <Body>
          <p>Two personas organise the research into recognisable contexts. Aanya is a design student who is comfortable with visual work but worries about phrasing, fluency and judgment during discussion. Rohan is a young professional whose prepared ideas become harder to express in meetings, particularly when hierarchy or spontaneity is involved.</p>
          <p>Their goals overlap, but the circumstances differ. Aanya needs a way to contribute during critiques and group assignments. Rohan needs to communicate clearly during meetings, client conversations and professional exchanges.</p>
          <p>The journey maps extend beyond the speaking moment. They include anticipation, preparation, entering the conversation, being prompted to speak and reflecting afterward. Across those stages, the recurring difficulty is that preparation often stays silent or mental. Once the interaction ends, people may replay what went wrong without receiving useful feedback about how to improve.</p>
        </Body>

        <div className="persona-grid">
          <article className="persona-card">
            <SuppliedImage src={aanyaImage} alt="Supplied image for Aanya persona" label="Aanya persona image" />
            <div className="persona-body"><h3>Aanya Mehta</h3><p>19 · Design student · Mumbai</p><strong>Wants to</strong><p>Contribute in critiques and explain her ideas clearly.</p><strong>Gets held back by</strong><p>Fear of phrasing something incorrectly and being judged in a group.</p><strong>Design opportunity</strong><p>Private rehearsal, a gentle warm-up and relevant academic scenarios.</p></div>
          </article>
          <article className="persona-card">
            <SuppliedImage src={rohanImage} alt="Supplied image for Rohan persona" label="Rohan persona image" />
            <div className="persona-body"><h3>Rohan Kapoor</h3><p>30 · Marketing associate · Pune</p><strong>Wants to</strong><p>Speak confidently in meetings and respond to unexpected questions.</p><strong>Gets held back by</strong><p>Hierarchy and pressure to respond spontaneously, despite preparing his ideas.</p><strong>Design opportunity</strong><p>Workplace scenarios, realistic prompts and feedback that suggests a next step.</p></div>
          </article>
        </div>

        <div className="subheading">Empathy map</div>
        <div className="quad-grid">
          {[
            ["01", "Says", "Worries about sounding wrong or struggling to make a point."],
            ["02", "Thinks", "Anticipates judgment before the conversation has begun."],
            ["03", "Does", "Overprepares, mentally rehearses and waits to be invited to speak."],
            ["04", "Feels", "Nervous before speaking and frustrated after missing a chance to contribute."],
          ].map(([n, title, text]) =><div className="quad-card" key={n}><span>{n}</span><h3>{title}</h3><p>{text}</p></div>)}
        </div>

        <div className="subheading">Journey map</div>
        <h3 className="map-title">Before, during and after speaking</h3>
        <Journey items={[
          { title: "Anticipate", description: "Sees an upcoming critique or meeting.", state: "Concern about being put on the spot.", opportunity: "Choose a relevant scenario early." },
          { title: "Prepare", description: "Writes notes and rehearses mentally.", state: "Prepared content, uncertain delivery.", opportunity: "Turn silent preparation into spoken practice." },
          { title: "Participate", description: "Waits, stays quiet or rushes when prompted.", state: "Pressure rises in the moment.", opportunity: "Practise turn-taking in a lower-pressure setting." },
          { title: "Reflect", description: "Replays mistakes without clear feedback.", state: "Doubt carries into the next attempt.", opportunity: "Offer specific feedback and another attempt." },
        ]} />
      </section>

      <section id="s4" className="case-section">
        <SectionTitle number="04" title="Turning research into a product direction" />
        <CompareTable
          headers={["Research finding or need", "Response visible in the design", "Why the connection matters"]}
          rows={[
            ["Fear of judgment and hesitation in formal settings", "Self-simulation and individual practice", "Offers a way to rehearse before practising with other people"],
            ["Difficulty with spontaneous communication", "Interview, presentation, team-meeting and networking scenarios", "Makes practice relevant to situations the audience expects to encounter"],
            ["Uncertainty about what to say", "A script bank of phrases and practice topics", "Gives people an entry point when starting feels difficult"],
            ["Need for feedback", "Session summaries, coach tips and private self-reflection", "Makes the next step more concrete than a general impression of success or failure"],
            ["Need for peer support", "Create-room and join-room flows in the Arena", "Introduces practice with others as another mode of participation"],
            ["Language and comfort differences", "Goal, language and comfort-level onboarding", "Lets the experience acknowledge different starting points"],
          ]}
        />
        <div className="loop-grid">
          <div><span>Prepare</span><p>Choose a goal, warm up and use prompts.</p></div>
          <div><span>Practise</span><p>Try a scenario alone or join a room.</p></div>
          <div><span>Reflect</span><p>Review feedback and choose what to work on next.</p></div>
        </div>
        <div className="loop-note">Reflection informs the next practice session</div>
      </section>

      <section id="s5" className="case-section">
        <SectionTitle number="05" title="Learning from existing approaches" />
        <Body><p>The comparative exploration includes speech-coaching tools, conversation platforms, teleprompters, course-based learning and other communication aids. The useful distinction is between tools that help people prepare content, tools that evaluate delivery, and spaces where people can actually practise an exchange.</p><p>Speak Up brings several of those activities into one proposed experience. A person can prepare, practise alone, practise with peers and reflect afterward. The intended value lies in this continuity across preparation, practice and reflection.</p></Body>
      </section>

      <section id="s6" className="case-section">
        <SectionTitle number="06" title="Designing the practice experience" />
        <div className="numbered-copy">
          {[
            ["Start with the person's goal", "Onboarding asks what the person wants to work on, their preferred language and their comfort level. The goals include building confidence, improving tone and preparing for interviews."],
            ["Give preparation a place", "The Home screen offers a coach entry point, a warm-up, progress and a daily challenge. The warm-up combines breathing prompts and vocal drills."],
            ["Make practice situational", "Self-simulation offers academic, workplace and social categories, with scenarios such as interviews, presentations, team meetings and networking."],
            ["Support practice with another person", "The Arena includes hosting and joining a room, while the script bank offers prompts for interviews, debates, presentations, meetings and networking."],
            ["Close with reflection", "Session summaries combine example scores, a short coach tip and self-ratings for clarity, tone and empathy. A progress report provides continuity across sessions."],
          ].map(([title, text], index) =><div className="numbered-row" key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></div>)}
        </div>
        <div className="solution-gallery">
          <figure><img src={images["speak-warmup.png"]} alt="Speak Up warm-up screen" /><figcaption>Warm-up introduces breathing and vocal preparation before speaking.</figcaption></figure>
          <figure><img src={images["speak-coach.png"]} alt="Speak Up coach screen" /><figcaption>The coach gives an approachable place to ask for support.</figcaption></figure>
        </div>
      </section>

      <section id="s7" className="case-section">
        <SectionTitle number="07" title="Visual language and interface refinement" />
        <Body>
          <p>The interface uses warm neutrals, green actions, rounded cards and a persistent bottom navigation. Later practice and summary screens introduce more editorial typography and a warmer cream background.</p>
          <p>The refinement direction is to align typography, spacing, card treatments and naming across the journey. Feedback language also needs to stay specific and supportive rather than evaluative.</p>
          <p>Numerical confidence and eye-contact scores can provide visible feedback, but they should be treated as example interface states until their measurement method and usefulness are tested.</p>
        </Body>
        <div className="visual-style-layout">
          <div className="visual-style-swatch"><span className="swatch" style={{ background: "#F6F4EE" }}></span><b>Warm neutral</b><small>Primary surface</small></div>
          <div className="visual-style-swatch"><span className="swatch" style={{ background: "#257A67" }}></span><b>Action green</b><small>Interactive emphasis</small></div>
          <div className="visual-style-swatch"><span className="swatch" style={{ background: "#E6D8C7" }}></span><b>Warm accent</b><small>Secondary surface</small></div>
          <div className="visual-style-swatch"><span className="swatch" style={{ background: "#1C1C1C" }}></span><b>Editorial black</b><small>Type and contrast</small></div>
        </div>
        <SuppliedImage src={visualStyleImage} alt="Supplied Speak Up visual style board" label="Speak Up visual style image" />
      </section>

      <section id="s8" className="case-section">
        <SectionTitle number="08" title="What the project currently achieves" />
        <Body><p>The work connects an identified communication difficulty with a coherent set of practice activities. It demonstrates research synthesis, scenario design and the construction of a multi-screen mobile experience.</p><p>The current evidence does not establish that users became more confident or improved their communication because of the app. The defensible outcome is the design and prototype, with an explicit plan to evaluate its usefulness.</p></Body>
      </section>

      <section id="s9" className="case-section">
        <SectionTitle number="09" title="What I would examine next" />
        <Body><p>Ask representative students and young professionals to choose a scenario, complete a short practice flow and interpret the summary. Observe whether they understand the difference between solo practice and the Arena, whether they can identify one useful next action, and whether the feedback encourages another attempt.</p><p>Compare a score-heavy summary with a reflection-led version. Longer-term evaluation would be needed to understand whether practice transfers into real conversations.</p></Body>
        <div className="reflection"><div className="eyebrow">Reflection</div><h2>Confidence needs a practical next step.</h2><p>Connecting preparation, speaking and reflection gives the experience a clearer purpose than a collection of communication tips.</p></div>
      </section>
    </PageShell>
  )
}

function SkillBazaar() {
  const images = useCaseImages()
  return (
    <PageShell
      current="skill"
      tags={["Entrepreneurship", "Product strategy", "Service design"]}
      title="Skill Bazaar"
      subtitle="Turning the intention to learn into a first local session"
    >
      <Index items={[
        { id: "k1", label: "The starting idea" },
        { id: "k2", label: "Defining the opportunity" },
        { id: "k3", label: "Separating a promising idea from evidence of demand" },
        { id: "k4", label: "Considering the alternatives" },
        { id: "k5", label: "Translating the idea into an experience" },
        { id: "k6", label: "Exploring the business model" },
        { id: "k7", label: "Thinking about scale" },
        { id: "k8", label: "What the project currently achieves" },
        { id: "k9", label: "What I would examine next" },
      ]} />

      <section className="hero-band">
        <div className="experience-heading"><span>Skill Bazaar / The experience</span><h2>Start with curiosity.<br />Learn from someone nearby.</h2><p>Five skills. One starting city. An idea for making the first session easier to begin.</p></div>
        <HeroImage src={images["skill-discovery.jpg"]} alt="Skill Bazaar discovery page" label="Skill Bazaar / Discovery" />
      </section>

      <section className="case-section">
        <SectionTitle number="Overview" title="The project at a glance" />
        <div className="problem-grid"><div><span>01</span><h3>The problem</h3><p>Starting a skill can feel too expensive, inflexible or uncertain.</p></div><div><span>02</span><h3>The direction</h3><p>A local marketplace that makes the teacher, session and first conversation visible.</p></div></div>
        <Body><p>An entrepreneurship project exploring how a local peer-learning marketplace could make starting a skill easier and what it would take to turn that idea into a sustainable, scalable service.</p></Body>
        <MetaGrid items={[{ label: "Discipline", value: "Entrepreneurship, product strategy, service design, UX/UI" }, { label: "Starting market", value: "Ahmedabad" }, { label: "Target audience", value: "Adults seeking flexible learning and people who want to teach practical skills" }]} />
      </section>

      <section id="k1" className="case-section"><SectionTitle number="01" title="The starting idea" /><Body><p>Many people have a skill they keep meaning to learn. The obstacle may be the commitment involved in beginning: the cost of a course, a fixed schedule, uncertainty about a teacher, or the feeling that a casual interest requires a serious long-term decision.</p><p>Skill Bazaar explores a smaller first step. Someone interested in guitar, gardening, football, home cooking or baking could discover a nearby teacher, understand their approach and discuss a session before committing. At the same time, a person with practical knowledge could explore teaching as a flexible source of income.</p><p>The central entrepreneurship question is whether this exchange can create enough value for both sides to sustain a marketplace. The website is one expression of that idea; the business depends on trust, reliable delivery, repeat participation and a workable revenue model.</p></Body></section>

      <section id="k2" className="case-section"><SectionTitle number="02" title="Defining the opportunity" /><Body><p>The idea canvas frames the problem as a lack of affordable, flexible and trusted peer-to-peer skill learning. It explores short, low-commitment sessions and a community that could continue beyond the first exchange.</p><p>The early audience is broad: college students, young professionals, homemakers, working parents and other curious adults. On the supply side are people with skills gained through practice and lived experience. The proposed starting point is local, allowing discovery and trust to develop within a city before expansion.</p><p>A useful narrowing already appears in the work: beginning with a limited set of skills and a defined geography. The live prototype makes this more concrete by focusing on Ahmedabad and five categories.</p></Body></section>

      <section id="k3" className="case-section"><SectionTitle number="03" title="Separating a promising idea from evidence of demand" /><Body><p>The validation framework asks five important questions: how often people might return, how painful the problem is, whether they would pay, how the idea improves on alternatives, and what could undermine the business.</p><p>The board contains proposed answers and assumptions, including willingness to pay and the value of peer learning. It does not provide a verified record of completed paid sessions, customer interviews or conversion results supporting those claims.</p></Body><CompareTable headers={["Assumption to investigate", "Why it matters", "Evidence that would test it"]} rows={[["People will pay for a small first session", "Interest alone does not create demand", "Completed paid pilot sessions and reasons for declining"],["Everyday experts are willing to teach", "The service needs dependable supply", "Teachers who progress from interest to actually running a session"],["Locality makes starting easier", "Travel and familiarity may affect participation", "Booking and attendance patterns across areas"],["Profiles and conversation build trust", "Learning requires confidence in another person", "What learners inspect or ask before committing"],["People will return through the platform", "Repeat participation affects sustainability", "Repeat bookings, referrals and reasons for moving off-platform"]]} /></section>

      <section id="k4" className="case-section"><SectionTitle number="04" title="Considering the alternatives" /><Body><p>The competitor exploration compares barter-based exchanges, local social platforms, tutor marketplaces and recorded-course providers. The strategic contrast is useful: a free resource may leave a learner without personal guidance; a structured course may require more commitment than they want; a formal tutor may feel expensive or unsuitable for casual exploration.</p><p>Skill Bazaar's proposed position combines discovery, live interaction and flexible commitment. The comparison informs positioning rather than establishing market superiority.</p></Body></section>

      <section id="k5" className="case-section"><SectionTitle number="05" title="Translating the idea into an experience" /><Body><p>The prototype presents a journey in three stages: browse profiles, chat and align, then agree on a teacher-set price. This makes the person offering the skill central to the experience.</p><p>Discover a relevant skill. The interface offers five starting categories. A learner can begin with a recognisable interest rather than a large catalogue of courses.</p><p>Evaluate the teacher. Featured cards display a skill, location, experience, specialities, example price, reviews and portfolio entry point.</p><p>Talk before committing. Start a Conversation is a prominent action that allows questions about goals, teaching style and fit before payment.</p></Body><img className="wide-image" src={images["skill-teachers.jpg"]} alt="Skill Bazaar teacher profiles" /></section>

      <section id="k6" className="case-section"><SectionTitle number="06" title="Exploring the business model" /><Body><p>The working canvases explore commission revenue, premium teacher visibility, session bundles and possible onboarding fees. Commission values differ across sections, while the current prototype promotes zero platform commissions and no platform cut.</p><p>Several models were explored. The final economics still need alignment with the customer promise. Monetisation affects interaction design because a commission model needs a reason for people to book again through the platform.</p></Body></section>

      <section id="k7" className="case-section"><SectionTitle number="07" title="Thinking about scale" /><Body><p>The research proposes beginning manually, including an early set of sessions arranged through existing communication and payment channels. The board proposes a first pilot of 50 sessions; this remains a plan to test the service.</p><p>The growth concept is city by city, using college groups, neighbourhood communities, local social channels and referrals. A scalable version would need repeatable teacher onboarding, expectations for session quality, cancellation handling, support and ways to preserve trust as the network grows.</p></Body><div className="service-grid"><div><span>Learner</span><p>Discover → compare → enquire → attend → return</p></div><div><span>Visible service</span><p>Categories, profiles, conversation and clear session expectations.</p></div><div><span>Teacher</span><p>Explain the skill, agree on a fit, arrange the session and deliver it.</p></div><div><span>Operations</span><p>Recruit teachers, check listings, coordinate problems and learn from repeat participation.</p></div></div></section>

      <section id="k8" className="case-section"><SectionTitle number="08" title="What the project currently achieves" /><Body><p>Skill Bazaar turns a broad learning idea into a defined marketplace proposition with a city, starter categories, discovery experience and business assumptions. It demonstrates the connection between user value and commercial questions.</p><p>The prototype displays illustrative ratings, review counts and session figures. These are interface content, not evidence of adoption or impact.</p></Body></section>

      <section id="k9" className="case-section"><SectionTitle number="09" title="What I would examine next" /><Body><p>Run a small local pilot, record the effort needed to recruit and support both sides, and follow the complete journey from enquiry to attendance and repeat interest. Use the findings to choose a revenue model, revise the prototype's promise and identify which coordination tasks genuinely need software.</p></Body><div className="reflection"><div className="eyebrow">Reflection</div><h2>A marketplace is more than discovery.</h2><p>A scalable service needs a reliable exchange, a reason to return and a revenue model that supports its promise to learners and teachers.</p></div></section>
    </PageShell>
  )
}

function Flames() {
  const images = useCaseImages()
  return (
    <PageShell current="flames" tags={["Multisensory design", "Physical computing", "Unity"]} title="Flames of the Forgotten" subtitle="Keeping a story alive through physical effort">
      <Index items={[{ id: "f1", label: "The intention" }, { id: "f2", label: "Choosing participation as the storytelling method" }, { id: "f3", label: "The experience from beginning to end" }, { id: "f4", label: "Connecting objects, sensors and Unity" }, { id: "f5", label: "Making rhythm consequential" }, { id: "f6", label: "Developing the atmosphere" }, { id: "f7", label: "Building a multisensory experience" }, { id: "f8", label: "What the prototype demonstrates" }, { id: "f9", label: "What I would examine next" }]} />

      <section className="hero-band hero-dark"><div className="experience-heading"><span>Flames of the Forgotten / The experience</span><h2>Strike to ignite.<br />Pump to sustain.</h2><p>Adjust the rhythm to shape the ending.</p></div><HeroImage src={images["flames-fire.png"]} alt="Flames of the Forgotten forge scene" label="Flames / Fire" /></section>

      <section className="case-section"><SectionTitle number="Overview" title="The project at a glance" /><div className="problem-grid"><div><span>01</span><h3>The intention</h3><p>Make a story about a hidden forge something a visitor experiences through action.</p></div><div><span>02</span><h3>The interaction</h3><p>Strike to ignite. Pump to sustain. Adjust the rhythm to shape the ending.</p></div></div><Body><p>A multisensory installation that connects physical flint-and-steel and bellows interactions to a virtual forge in Unity, using the visitor's rhythm to shape the narrative.</p></Body><MetaGrid items={[{ label: "Discipline", value: "Multisensory design, tangible interaction, creative technology" }, { label: "Team", value: "Nehal Thakkar and Paras Chanana" }, { label: "My contribution", value: "Unity development and some assets" }, { label: "Collaborator contribution", value: "Paras handled the environment" }, { label: "Target audience", value: "Visitors encountering the installation for the first time" }]} /></section>

      <section id="f1" className="case-section"><SectionTitle number="01" title="The intention" /><Body><p>Flames of the Forgotten explores how a visitor might connect with a story through action. Its setting is a hidden forge, and its central interaction asks the visitor to create and sustain a fire through physical effort.</p><p>The deck frames the narrative around Malabar blacksmiths, identified as Kollan, in the early twentieth century. Within the project's story, maintaining the craft involves working under the threat of discovery. The visitor is placed inside a small part of that tension: the fire must be kept alive, but excessive force can produce smoke that reveals the forge.</p><p>This is a designed interpretation of heritage. The setting is a narrative interpretation rather than an independently verified historical reconstruction.</p></Body></section>

      <section id="f2" className="case-section"><SectionTitle number="02" title="Choosing participation as the storytelling method" /><Body><p>The visitor is not expected to be a blacksmith. They briefly enter a world where an apparently simple task, keeping a fire alive, requires attention and restraint.</p><p>The physical objects give that task a familiar logic. Striking initiates ignition. Pumping bellows sustains the fire. The screen makes the effects visible, while the intended sound and atmosphere give the actions a setting.</p><p>The design's key tension is the relationship between effort and care. Stronger or faster input does not necessarily lead to a better outcome. The participant needs to notice the response and adjust their behaviour.</p></Body></section>

      <section id="f3" className="case-section"><SectionTitle number="03" title="The experience from beginning to end" /><CompareTable headers={["Stage", "Visitor action", "Response", "Narrative purpose"]} rows={[["Enter", "Approach the dim workshop installation", "A hidden forge appears in the virtual environment", "Establish the setting and mood"],["Ignite", "Strike the physical objects", "Sparks and an ember response", "Make the visitor responsible for beginning the experience"],["Sustain", "Pump the physical bellows", "Fire grows and sound intensifies", "Connect effort with maintaining the forge"],["Regulate", "Adjust the rhythm and intensity", "Fire and smoke communicate the effect of input", "Introduce a need for restraint and attention"],["Reach an ending", "Continue steadily or pump excessively", "One of two narrative endings", "Connect behaviour with consequence"],["Reflect", "Read the concluding message", "The forge's survival or discovery is explained", "Relate the interaction back to the story"]]} /></section>

      <section id="f4" className="case-section"><SectionTitle number="04" title="Connecting objects, sensors and Unity" /><Body><p>The technical approach uses a vibration sensor, HW-500, for the flint-and-steel interaction, and an ultrasonic sensor, HC-SR04, for the bellows. These components define the interaction approach.</p><p>Unity is the visible response layer: environment, sparks, flame, smoke and narrative states connect the physical action to the story.</p></Body><div className="systems-grid"><div><span>Strike flint and steel</span><strong>HW-500 vibration sensor</strong><small>Ignition input</small></div><div><span>Move the bellows</span><strong>HC-SR04 ultrasonic sensor</strong><small>Movement input</small></div><div className="system-wide"><span>Unity</span><strong>Interaction logic translates input into visible fire and smoke.</strong></div><div><span>Gentle, steady rhythm</span><strong>The fire is sustained.</strong><small>The hidden forge survives.</small></div><div><span>Excessive force or speed</span><strong>Smoke increases.</strong><small>The forge is discovered.</small></div></div></section>

      <section id="f5" className="case-section"><SectionTitle number="05" title="Making rhythm consequential" /><Body><p>The deck defines two endings. In one, gentle rhythmic pumping keeps the forge alive and protects the hidden workspace. In the other, pumping too hard and too fast creates thick smoke and leads to discovery within the narrative.</p><p>The design depends on the visitor being able to read the response before the final consequence. If the relationship between pumping and smoke is unclear, the ending risks feeling arbitrary. If it is legible, the visitor has a reason to slow down, adjust and remain attentive.</p></Body></section>

      <section className="case-section"><div className="subheading">Journey map</div><h2 className="map-title">A visitor learns by noticing the response</h2><Journey items={[{ title: "Approach", description: "Encounters the forge and physical objects.", state: "Intended feeling: curiosity.", opportunity: "Make the first action easy to recognise." }, { title: "Ignite", description: "Strikes and sees an ignition response.", state: "Intended feeling: agency.", opportunity: "Connect the action and response clearly." }, { title: "Regulate", description: "Pumps, watches the fire and adjusts the rhythm.", state: "Intended feeling: care and tension.", opportunity: "Make smoke a readable warning." }, { title: "Understand", description: "Reaches an ending and reads the reveal.", state: "Intended feeling: reflection.", opportunity: "Connect the consequence back to the story." }]} /></section>

      <section id="f6" className="case-section"><SectionTitle number="06" title="Developing the atmosphere" /><Body><p>The development screenshots include an earlier bright environment in the Unity editor and later darker views of the workshop. The sequence supports a visual-development comparison: the initial scene establishes the space and assets, while the later treatment brings attention toward the forge and creates a more concealed atmosphere.</p><p>This is collaborative project documentation: Paras handled the environment, while the Unity development and some assets were part of my contribution.</p></Body><VisualGrid images={[{ src: images["flames-early.png"], alt: "Early Unity scene", label: "01 / Early Unity scene" }, { src: images["flames-development.png"], alt: "Workshop development", label: "02 / Workshop development" }, { src: images["flames-fire.png"], alt: "Fire and tools", label: "03 / Fire and tools" }, { src: images["flames-night.png"], alt: "Darker workshop treatment", label: "04 / Darker treatment" }]} /></section>

      <section id="f7" className="case-section"><SectionTitle number="07" title="Building a multisensory experience" /><Body><p>The deck lists tactile interaction through the objects, visual fire and sparks, sound including striking and crackling, burnt-ash scent, and a thermal effect using a hidden heater or hairdryer. Each channel has a distinct intended role: touch gives the visitor something to do, visuals reveal change, sound reinforces activity, and scent or warmth extends the atmosphere beyond the screen.</p></Body><div className="sense-grid"><div><span>01</span><h3>Touch / participation</h3><p>Flint-and-steel and bellows give the visitor physical actions that drive the experience.</p></div><div><span>02</span><h3>Sight / feedback</h3><p>Fire, sparks and smoke make changes in the virtual forge visible.</p></div><div><span>03</span><h3>Sound / reinforcement</h3><p>Striking and crackling sounds reinforce the workshop setting.</p></div><div><span>04</span><h3>Scent and warmth / atmosphere</h3><p>Burnt-ash scent and thermal effect are documented intentions and should be confirmed in testing.</p></div></div></section>

      <section id="f8" className="case-section"><SectionTitle number="08" title="What the prototype demonstrates" /><Body><p>The project demonstrates an approach to linking physical effort with digital narrative. The objects, virtual environment and ending logic are designed as parts of one experience.</p><p>The next distinction to make is between an interaction functioning and an experience communicating its meaning. Further evaluation is needed to understand whether visitors understood the historical framing, recognised the reason for the two endings, or independently learned how to regulate the bellows.</p></Body></section>

      <section id="f9" className="case-section"><SectionTitle number="09" title="What I would examine next" /><Body><p>Observe first-time visitors without explaining the sequence. Check whether they know where to begin, notice the effect of their actions and connect smoke with consequence. Ask them to describe the story in their own words. Document calibration and failure recovery so the installation can run repeatedly.</p></Body><div className="reflection"><div className="eyebrow">Reflection</div><h2>Meaning appears in the relationship between action, feedback and consequence.</h2><p>The story becomes meaningful when a visitor can read the effect of an action and choose how to continue.</p></div></section>
    </PageShell>
  )
}

function HealthCare({ shivaImage }: { shivaImage?: string }) {
  const images = useCaseImages()
  return (
    <PageShell current="health" tags={["Field research", "Service design", "Group of four"]} title="Experience of First Encounter with Health Care" subtitle="Understanding what happens before a worker reaches formal care">
      <Index items={[{ id: "h1", label: "Beginning with the first response to discomfort" }, { id: "h2", label: "What the team recorded" }, { id: "h3", label: "Synthesising the barriers" }, { id: "h4", label: "Looking at the service through several stakeholders" }, { id: "h5", label: "Moving from findings to possibilities" }, { id: "h6", label: "The current solution direction" }, { id: "h7", label: "Connecting research with interface decisions" }, { id: "h8", label: "What the project currently achieves" }, { id: "h9", label: "What I would examine next" }]} />

      <section className="hero-band health-hero"><div className="experience-heading"><span>First encounter / The experience</span><h2>Making the first step<br />towards care feel familiar.</h2><p>A conversational service concept shaped by time, trust, language and the realities of a working day.</p></div><HeroImage src={images["health-welcome.jpg"]} alt="Health Assistant conversational screen" label="Health / Welcome" /></section>

      <section className="case-section"><SectionTitle number="Overview" title="The project at a glance" /><div className="problem-grid"><div><span>01</span><h3>The problem</h3><p>The decision to seek care competes with time, income and existing networks of trust.</p></div><div><span>02</span><h3>The direction</h3><p>Explore familiar, multilingual conversations as one entry point into a wider service.</p></div></div><Body><p>A group of four people investigating construction workers' first responses to health concerns and exploring a familiar, multilingual route toward information and formal care.</p></Body><MetaGrid items={[{ label: "Discipline", value: "Field research, service design, interaction design, conversational UI" }, { label: "Team", value: "Group of 4 people" }, { label: "Target audience", value: "Construction workers, with contractors, supervisors, chemists and local clinics considered as related stakeholders" }]} /></section>

      <section className="case-section"><div className="target-audience-feature"><div className="target-image"><SuppliedImage src={shivaImage} alt="Supplied image of Shiva" label="Shiva persona image" /></div><div className="target-copy"><div className="eyebrow">Target audience</div><h2>Shiva, 33</h2><p className="lead">A Rajasthani migrant worker who is new to the city.</p><p>Shiva represents a worker who is building a new routine away from his hometown. Language, unfamiliar surroundings, time away from work and reliance on people he already trusts can shape how he decides what to do when he feels unwell.</p><div className="target-facts"><span>33 years old</span><span>Rajasthan to Ahmedabad</span><span>New to the city</span><span>Construction worker</span></div></div></div></section>

      <section id="h1" className="case-section"><SectionTitle number="01" title="Beginning with the first response to discomfort" /><Body><p>The project examines what happens when a construction worker first feels unwell. The first encounter with healthcare may begin with deciding to keep working, asking a supervisor for help, visiting a nearby chemist or waiting until the condition feels serious enough to leave the site.</p><p>For this audience, the decision is connected to work, income, familiarity and trust. A formal healthcare service may exist nearby while still being difficult to use within the realities of a working day.</p></Body></section>

      <section id="h2" className="case-section"><SectionTitle number="02" title="What the team recorded" /><Body><p>The board separates what people said, what the team observed and what the team felt. Recorded accounts include asking a contractor to arrange medicines, using nearby clinics, going home when a condition worsens, and returning to a hometown doctor for more familiar care.</p><p>Site observations include heat exposure, physically demanding work, limited visible rest or medical support in some settings, and concerns about sanitation and support for women workers. The evidence is not uniform and shows variation in available support.</p></Body></section>

      <section id="h3" className="case-section"><SectionTitle number="03" title="Synthesising the barriers" /><Body><p>The team’s synthesis identifies several connected barriers rather than a single lack of awareness.</p><p>Time away from work carries a cost. Familiar help can be easier to approach. Support is not always visible within the routine. Digital familiarity creates a possible contact point for some workers, alongside options for people who cannot use a smartphone service.</p></Body></section>

      <section className="case-section"><div className="subheading">Journey map</div><h2 className="map-title">The first encounter often starts before a clinic</h2><Journey items={[{ title: "Feel discomfort", description: "Notices a concern during the working day.", state: "Uncertainty about seriousness.", opportunity: "Make the next step understandable." }, { title: "Keep working", description: "Balances seeking help with time and income.", state: "Concern about lost wages.", opportunity: "Reduce the effort of finding help." }, { title: "Ask someone familiar", description: "Turns to a contractor, chemist or known doctor.", state: "Trust influences the choice.", opportunity: "Connect existing relationships to formal support." }, { title: "Seek care and follow up", description: "Visits a provider or returns home; continuity may break.", state: "Relief may replace follow-up.", opportunity: "Explore clear guidance and record continuity." }]} /></section>

      <section id="h4" className="case-section"><SectionTitle number="04" title="Looking at the service through several stakeholders" /><Body><p>The board develops points of view for workers, contractors and healthcare providers. Workers need a manageable way to understand a concern and find an appropriate next step. Contractors and supervisors may lack a dependable route to formal services. Chemists and local clinics encounter workers when they seek assistance, creating a possible bridge to clearer guidance and follow-up.</p><p>An interface can make information easier to navigate, but the service still needs a person or organisation able to respond.</p></Body><div className="stakeholder-grid"><div><span>Worker</span><p>Time, trust, language and access</p></div><div><span>Contractor / supervisor</span><p>Existing source of practical help.</p></div><div><span>Chemist / local clinic</span><p>A familiar first point of care.</p></div><div><span>Health Assistant concept</span><p>A possible route to clearer information.</p></div><div><span>Formal providers and schemes</span><p>Real services and partnerships needed beyond the interface.</p></div></div></section>

      <section id="h5" className="case-section"><SectionTitle number="05" title="Moving from findings to possibilities" /><Body><p>The team generated How might we questions around access near work, timely information, familiar communication channels and links between contractors and formal healthcare. One prominent question asks how basic healthcare could be brought inside the construction site so workers do not have to leave work to seek help.</p><p>The concept exploration spans scheduled on-site care, missed-call or audio guidance, familiar messaging interactions, cards and visual signposting, links to clinics and welfare support, and more technology-intensive ideas. These concepts are alternatives rather than a single final feature list.</p></Body><CompareTable headers={["Direction explored", "Research connection", "Question still requiring evaluation"]} rows={[["Scheduled on-site care", "Travel and time away from work", "Who delivers and funds the service?"],["Missed-call or audio guidance", "Language, reading and connectivity barriers", "Can workers understand and act on the response?"],["Familiar messaging interactions", "Observed phone use", "Which workers can use the channel independently?"],["Cards and visual signposting", "Uncertainty about where to seek help", "Is the information current, legible and reachable?"],["Links to clinics and welfare support", "Reliance on informal networks", "What real partnerships make the next step possible?"]]} /></section>

      <section id="h6" className="case-section"><SectionTitle number="06" title="The current solution direction" /><Body><p>The prototype presents a mobile-style Health Assistant through a conversation interface. Its welcome message describes four intended areas of support: checking health symptoms, finding nearby doctors and clinics, registering for welfare schemes and keeping health records.</p><p>The initial screen offers Hindi, Gujarati, Tamil and English. The English flow continues by asking for a name, age, gender and area or city. A change-language control remains available.</p><p>This provides a concrete direction for the service: guiding a person through smaller conversational steps. The interface is messaging-like; the published page is not proof of a deployed messaging integration or an operational AI health service.</p></Body><div className="phone-grid"><PhoneScreen src={images["health-welcome.jpg"]} alt="Health Assistant welcome screen in a light phone frame" label="Health / Welcome" /><PhoneScreen src={images["health-menu.jpg"]} alt="Health Assistant menu screen in a light phone frame" label="Health / Menu" /></div></section>

      <section id="h7" className="case-section"><SectionTitle number="07" title="Connecting research with interface decisions" /><CompareTable headers={["Research theme", "Connection to the prototype", "Limit to acknowledge"]} rows={[["Language and comprehension", "Language choice before the main conversation", "Translation quality and comprehension need evaluation"],["Familiar digital behaviour among some workers", "A conversational, mobile-style interface", "Familiar appearance does not establish independent usability"],["Difficulty finding a trusted next step", "The prototype proposes nearby-care assistance", "Provider information and referral arrangements need verification"],["Limited scheme awareness", "Welfare support appears in the proposed scope", "Eligibility and enrolment need authoritative service connections"],["Interrupted or fragmented care", "Record continuity appears in the proposed scope", "Consent, access and actual record handling are not established"]]} /></section>

      <section id="h8" className="case-section"><SectionTitle number="08" title="What the project currently achieves" /><Body><p>The work makes the first steps toward healthcare visible as a design problem. It connects field observations with service questions, recognises several stakeholders and explores different ways to reduce effort at the point of seeking help.</p><p>The evidence does not establish reduced illness, improved treatment, successful welfare enrolment or saved wages. The demonstrated contribution is the group's research, synthesis and conversational prototype.</p></Body></section>

      <section id="h9" className="case-section"><SectionTitle number="09" title="What I would examine next" /><Body><p>Test comprehension with workers from the intended language groups, including people with varying reading and phone experience. Use fictional scenarios to assess whether they can select a language, understand a prompt and identify a next step without assistance. Test a path that offers help before profile completion.</p><p>Explore voice and non-smartphone alternatives where the research shows they are needed. Any health guidance or escalation flow would need qualified review and a real service arrangement before use beyond a student prototype.</p></Body><div className="reflection"><div className="eyebrow">Reflection</div><h2>Seeking care is shaped by the conditions around a person.</h2><p>Time, trust, language and work routines need to be considered together. The interface is one part of that wider service.</p></div></section>
    </PageShell>
  )
}

export default function CaseStudies(props) {
  const study = props.caseStudy

  const images = React.useMemo(() => ({
    "speak-home.png": props.speakHomeImage,
    "speak-arena.png": props.speakArenaImage,
    "speak-warmup.png": props.speakWarmupImage,
    "speak-coach.png": props.speakCoachImage,
    "skill-discovery.jpg": props.skillDiscoveryImage,
    "skill-teachers.jpg": props.skillTeachersImage,
    "flames-early.png": props.flamesEarlyImage,
    "flames-development.png": props.flamesDevelopmentImage,
    "flames-fire.png": props.flamesFireImage,
    "flames-night.png": props.flamesNightImage,
    "health-welcome.jpg": props.healthWelcomeImage,
    "health-menu.jpg": props.healthMenuImage,
  }), [
    props.speakHomeImage,
    props.speakArenaImage,
    props.speakWarmupImage,
    props.speakCoachImage,
    props.skillDiscoveryImage,
    props.skillTeachersImage,
    props.flamesEarlyImage,
    props.flamesDevelopmentImage,
    props.flamesFireImage,
    props.flamesNightImage,
    props.healthWelcomeImage,
    props.healthMenuImage,
  ])

  return (
    <CaseImageContext.Provider value={images}>
      {study === "Skill Bazaar" ? <SkillBazaar /> :
        study === "Flames of the Forgotten" ? <Flames /> :
          study === "Experience of First Encounter with Health Care" ? (
            <HealthCare shivaImage={props.shivaImage} />
          ) : (
            <SpeakUp
              aanyaImage={props.aanyaImage}
              rohanImage={props.rohanImage}
              visualStyleImage={props.visualStyleImage}
            />
          )}
    </CaseImageContext.Provider>
  )
}

addPropertyControls(CaseStudies, {
  caseStudy: {
    type: ControlType.Enum,
    title: "Case study",
    options: ["Speak Up", "Skill Bazaar", "Flames of the Forgotten", "Experience of First Encounter with Health Care"],
    optionTitles: ["Speak Up", "Skill Bazaar", "Flames of the Forgotten", "First Encounter with Health Care"],
    defaultValue: "Speak Up",
  },

  // Speak Up
  speakHomeImage: { type: ControlType.Image, title: "Speak Up / Home" },
  speakArenaImage: { type: ControlType.Image, title: "Speak Up / Arena" },
  speakWarmupImage: { type: ControlType.Image, title: "Speak Up / Warm-up" },
  speakCoachImage: { type: ControlType.Image, title: "Speak Up / Coach" },
  aanyaImage: { type: ControlType.Image, title: "Speak Up / Aanya" },
  rohanImage: { type: ControlType.Image, title: "Speak Up / Rohan" },
  visualStyleImage: { type: ControlType.Image, title: "Speak Up / Visual style" },

  // Skill Bazaar
  skillDiscoveryImage: { type: ControlType.Image, title: "Skill Bazaar / Discovery" },
  skillTeachersImage: { type: ControlType.Image, title: "Skill Bazaar / Teachers" },

  // Flames of the Forgotten
  flamesEarlyImage: { type: ControlType.Image, title: "Flames / Early scene" },
  flamesDevelopmentImage: { type: ControlType.Image, title: "Flames / Development" },
  flamesFireImage: { type: ControlType.Image, title: "Flames / Fire" },
  flamesNightImage: { type: ControlType.Image, title: "Flames / Night" },

  // First Encounter with Health Care
  healthWelcomeImage: { type: ControlType.Image, title: "Health / Welcome" },
  healthMenuImage: { type: ControlType.Image, title: "Health / Menu" },
  shivaImage: { type: ControlType.Image, title: "Health / Shiva" },
})

const styles = `
.case-study-page{width:100%;min-height:100vh;background:${COLORS.bg};color:${COLORS.text};font-family:-apple-system,BlinkMacSystemFont,"Inter","Helvetica Neue",Arial,sans-serif;}
.case-study-page *{box-sizing:border-box}
.case-study-page a{color:inherit}
.image-placeholder{width:100%;min-height:260px;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:8px;padding:28px;text-align:center;background:#ECE9E1;border:1px dashed rgba(20,20,20,.22);color:#6E6A62}.image-placeholder span{font-size:14px;color:#141414}.image-placeholder small{font-size:11px;line-height:1.4;max-width:300px}
.cs-nav{position:sticky;top:0;z-index:30;width:100%;padding:20px 28px;display:flex;align-items:center;justify-content:space-between;background:rgba(246,244,238,.96);backdrop-filter:blur(14px);border-bottom:1px solid rgba(20,20,20,.08)}
.cs-brand{font-size:14px;text-decoration:none}
.cs-nav-links{display:flex;gap:26px}.cs-nav-links a{font-size:14px;text-decoration:none;opacity:.66}.cs-nav-links a:hover{opacity:1}
.case-study-container{width:min(1440px,100%);margin:0 auto;padding:0 28px 80px}
.cs-top{padding:58px 0 86px}.cs-back{display:flex;gap:18px;align-items:center;font-size:13px;margin-bottom:30px}.cs-back a{text-decoration:none}.cs-back span{opacity:.48}.cs-tags{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:18px}.cs-tags span{font-size:11px;padding:8px 11px;border:1px solid ${COLORS.line};border-radius:999px}.cs-top h1{font-size:clamp(50px,8vw,130px);line-height:.9;letter-spacing:-.065em;font-weight:600;max-width:1000px;margin:0}.cs-subtitle{font-size:clamp(19px,2.4vw,30px);line-height:1.15;max-width:650px;margin:28px 0 0;color:${COLORS.muted};letter-spacing:-.02em}.cs-research{display:inline-block;margin-top:24px;font-size:13px;text-decoration:none;border-bottom:1px solid currentColor;padding-bottom:3px}
.contents{display:grid;grid-template-columns:220px 1fr;gap:40px;border-top:1px solid ${COLORS.line};border-bottom:1px solid ${COLORS.line};padding:22px 0;margin-bottom:110px}.contents-label{font-size:12px;text-transform:uppercase;letter-spacing:.08em;opacity:.55}.contents-links{display:flex;flex-wrap:wrap;gap:9px 22px}.contents-links a{font-size:13px;text-decoration:none;opacity:.7}.contents-links a:hover{opacity:1}
.hero-band{padding:0 0 120px}.experience-heading{display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:end;margin-bottom:32px}.experience-heading span{grid-column:1/-1;font-size:12px;text-transform:uppercase;letter-spacing:.08em;opacity:.5}.experience-heading h2{font-size:clamp(42px,6.6vw,92px);line-height:.94;letter-spacing:-.058em;font-weight:500;margin:0}.experience-heading p{font-size:17px;line-height:1.45;color:${COLORS.muted};max-width:430px;margin:0 0 6px}.hero-image-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}.cs-hero-image{width:100%;min-height:260px;height:auto;display:block;background:#fff;object-fit:cover}.hero-dark .cs-hero-image{background:#111}
.case-section{padding:0 0 120px;border-top:1px solid ${COLORS.line};margin-top:10px;padding-top:34px}.section-title{display:grid;grid-template-columns:150px 1fr;gap:25px;margin-bottom:48px}.section-number{font-size:12px;text-transform:uppercase;letter-spacing:.08em;opacity:.52}.section-title h2{font-size:clamp(36px,5vw,72px);line-height:.98;letter-spacing:-.052em;font-weight:500;margin:0;max-width:960px}.eyebrow,.subheading{font-size:12px;text-transform:uppercase;letter-spacing:.08em;opacity:.55}.body-copy{max-width:820px;margin-left:175px}.body-copy p{font-size:17px;line-height:1.62;color:#333;margin:0 0 22px}.problem-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-left:175px;margin-bottom:42px}.problem-grid>div{padding:28px;border:1px solid ${COLORS.line};background:${COLORS.paper}.problem-grid span{font-size:12px;opacity:.48}.problem-grid h3{font-size:25px;letter-spacing:-.03em;margin:42px 0 12px}.problem-grid p{font-size:16px;line-height:1.5;color:${COLORS.muted};margin:0}.meta-grid{margin:50px 0 0 175px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0;border-top:1px solid ${COLORS.line};border-left:1px solid ${COLORS.line}}.meta-item{padding:22px 24px;border-right:1px solid ${COLORS.line};border-bottom:1px solid ${COLORS.line};min-height:120px}.meta-label{font-size:11px;text-transform:uppercase;letter-spacing:.08em;opacity:.5;margin-bottom:10px}.meta-value{font-size:15px;line-height:1.45}
.persona-grid{margin-left:175px;display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:44px}.persona-card{background:#fff;border:1px solid ${COLORS.line}.persona-body{padding:26px}.persona-body h3{font-size:34px;line-height:1;margin:0 0 8px;letter-spacing:-.04em}.persona-body>p{font-size:14px;line-height:1.5;color:${COLORS.muted};margin:0 0 18px}.persona-body strong{display:block;font-size:11px;text-transform:uppercase;letter-spacing:.08em;margin-top:18px}.supplied-image{width:100%;display:block;aspect-ratio:1.3;object-fit:cover;background:#eee}.supplied-placeholder{width:100%;aspect-ratio:1.3;background:#ECE9E1;border-bottom:1px solid ${COLORS.line};display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;padding:30px;text-align:center;color:${COLORS.muted}.supplied-placeholder strong{font-size:16px;color:${COLORS.text}}
.subheading{margin:64px 0 16px 175px}.map-title{margin:0 0 26px 175px;font-size:clamp(30px,4vw,54px);line-height:1;letter-spacing:-.045em;font-weight:500}.quad-grid,.journey-grid{margin-left:175px;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;align-items:stretch}.quad-card,.journey-card{border:1px solid ${COLORS.line};background:${COLORS.paper};padding:22px}.quad-card span,.journey-index{font-size:11px;opacity:.48}.quad-card h3,.journey-card h3{font-size:27px;line-height:1;letter-spacing:-.035em;margin:50px 0 15px}.quad-card p,.journey-card p{font-size:14px;line-height:1.5;color:${COLORS.muted};margin:0}.journey-card{min-height:320px;display:flex;flex-direction:column;align-items:flex-start}.journey-card h3{margin:45px 0 18px}.journey-card .opportunity-copy{margin-top:auto}.journey-state{font-size:14px;line-height:1.5;padding:18px 0;border-top:1px solid ${COLORS.line};margin-top:20px}.opportunity-label{font-size:10px;text-transform:uppercase;letter-spacing:.08em;opacity:.5;margin-top:20px}.opportunity-copy{color:${COLORS.text}!important}
.table-wrap{margin-left:175px;overflow:auto}.table-wrap table{width:100%;border-collapse:collapse;min-width:760px;background:#fff}.table-wrap th,.table-wrap td{border:1px solid ${COLORS.line};padding:16px;text-align:left;vertical-align:top;font-size:13px;line-height:1.45}.table-wrap th{font-size:11px;text-transform:uppercase;letter-spacing:.06em;background:#F0EEE7;font-weight:600}
.loop-grid{margin:60px 0 0 175px;display:grid;grid-template-columns:repeat(3,1fr);border:1px solid ${COLORS.line}.loop-grid>div{padding:24px;border-right:1px solid ${COLORS.line}.loop-grid>div:last-child{border-right:0}.loop-grid span{font-size:20px;font-weight:600;letter-spacing:-.03em}.loop-grid p{font-size:14px;line-height:1.5;color:${COLORS.muted};margin:14px 0 0}.loop-note{margin-left:175px;margin-top:15px;font-size:13px;color:${COLORS.muted}
.numbered-copy{margin-left:175px;display:grid;gap:0}.numbered-row{display:grid;grid-template-columns:70px 1fr;gap:30px;padding:25px 0;border-top:1px solid ${COLORS.line}.numbered-row span{font-size:12px;opacity:.5}.numbered-row h3{font-size:26px;line-height:1.05;letter-spacing:-.035em;margin:0 0 10px}.numbered-row p{font-size:15px;line-height:1.55;color:${COLORS.muted};margin:0;max-width:780px}.solution-gallery{margin:44px 0 0 175px;display:grid;grid-template-columns:1fr 1fr;gap:14px}.solution-gallery figure{margin:0}.solution-gallery img{width:100%;display:block;background:#fff}.solution-gallery figcaption,.visual-grid figcaption{font-size:11px;color:${COLORS.muted};padding-top:9px;line-height:1.4}
.visual-style-layout{margin-left:175px;display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:20px}.visual-style-swatch{border:1px solid ${COLORS.line};background:#fff;padding:14px}.visual-style-swatch .swatch{display:block;width:100%;height:90px;margin-bottom:15px;border:1px solid rgba(20,20,20,.1)}.visual-style-swatch b{font-size:14px;display:block}.visual-style-swatch small{font-size:11px;color:${COLORS.muted}
.reflection{margin:55px 0 0 175px;border-top:1px solid ${COLORS.line};padding-top:28px}.reflection h2{font-size:clamp(34px,5vw,66px);line-height:.98;letter-spacing:-.05em;font-weight:500;max-width:870px;margin:16px 0 16px}.reflection p{font-size:16px;line-height:1.55;color:${COLORS.muted};max-width:650px}
.wide-image{margin-left:175px;width:calc(100% - 175px);display:block;background:#fff;border:1px solid ${COLORS.line}}
.service-grid,.stakeholder-grid,.sense-grid,.systems-grid{margin-left:175px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.service-grid>div,.stakeholder-grid>div,.sense-grid>div,.systems-grid>div{border:1px solid ${COLORS.line};background:#fff;padding:22px;min-height:150px}.service-grid span,.stakeholder-grid span,.sense-grid span,.systems-grid span{font-size:11px;text-transform:uppercase;letter-spacing:.08em;opacity:.55}.service-grid p,.stakeholder-grid p,.sense-grid p,.systems-grid small{font-size:15px;line-height:1.5;color:${COLORS.muted};margin:35px 0 0}.systems-grid strong{display:block;font-size:20px;line-height:1.15;margin-top:22px}.systems-grid .system-wide{grid-column:1/-1}.sense-grid h3{font-size:24px;line-height:1.05;margin:38px 0 12px}.sense-grid p{margin:0}
.visual-grid{margin-left:175px;display:grid;grid-template-columns:repeat(2,1fr);gap:14px}.visual-grid figure{margin:0}.visual-grid img{display:block;width:100%;background:#fff}.phone-grid{margin-left:175px;display:grid;grid-template-columns:repeat(2,minmax(300px,420px));gap:30px;align-items:start}.phone-stage{width:100%;aspect-ratio:9/19;background:#fff;border:1px solid #D7D2C7;border-radius:28px;padding:9px;overflow:hidden;box-shadow:none}.phone-screen{width:100%;height:100%;object-fit:contain;object-position:center;display:block;background:#fff;border-radius:20px}
.target-audience-feature{margin-left:175px;display:grid;grid-template-columns:minmax(280px,430px) 1fr;gap:50px;align-items:center}.target-image{background:#fff;border:1px solid ${COLORS.line}.target-copy h2{font-size:clamp(46px,6vw,86px);line-height:.9;letter-spacing:-.06em;margin:14px 0}.target-copy .lead{font-size:21px;line-height:1.25;max-width:650px}.target-copy p{font-size:16px;line-height:1.55;color:${COLORS.muted};max-width:680px}.target-facts{display:flex;flex-wrap:wrap;gap:8px;margin-top:22px}.target-facts span{padding:9px 12px;border:1px solid ${COLORS.line};font-size:11px;text-transform:uppercase;letter-spacing:.04em}
.next-wrap{display:flex;justify-content:flex-end;margin-top:20px;padding-top:20px}.next-case{width:min(300px,100%);border-top:1px solid ${COLORS.line};padding-top:12px;display:flex;align-items:flex-end;justify-content:space-between;text-decoration:none}.next-label{display:block;font-size:10px;text-transform:uppercase;letter-spacing:.08em;opacity:.5;margin-bottom:10px}.next-case strong{font-size:20px;line-height:1.05;letter-spacing:-.03em;display:block;max-width:220px}.next-arrow{font-size:20px;line-height:1;transition:transform .2s ease}.next-case:hover .next-arrow{transform:translateX(5px)}
.cs-footer{display:flex;justify-content:space-between;border-top:1px solid ${COLORS.line};padding-top:20px;margin-top:90px;font-size:12px;opacity:.55}
@media(max-width:900px){.case-study-container{padding:0 20px 60px}.cs-nav{padding:18px 20px}.cs-nav-links{gap:15px}.contents{grid-template-columns:1fr;gap:14px}.experience-heading{grid-template-columns:1fr}.hero-image-grid{grid-template-columns:1fr}.section-title{grid-template-columns:1fr;gap:12px}.body-copy,.problem-grid,.meta-grid,.persona-grid,.quad-grid,.journey-grid,.table-wrap,.loop-grid,.solution-gallery,.visual-style-layout,.reflection,.wide-image,.service-grid,.stakeholder-grid,.sense-grid,.systems-grid,.visual-grid,.phone-grid,.target-audience-feature{margin-left:0}.problem-grid,.persona-grid{grid-template-columns:1fr}.quad-grid,.journey-grid{grid-template-columns:repeat(2,1fr)}.meta-grid{grid-template-columns:1fr}.visual-style-layout{grid-template-columns:repeat(2,1fr)}.phone-grid{grid-template-columns:repeat(2,minmax(260px,360px))}.target-audience-feature{grid-template-columns:1fr;gap:28px}.cs-top{padding-top:40px}.section-title h2{max-width:none}.experience-heading h2{font-size:clamp(42px,11vw,80px)}}
@media(max-width:600px){.cs-nav-links a:nth-child(1){display:none}.cs-brand{font-size:12px;max-width:110px}.cs-nav-links{gap:12px}.cs-nav-links a{font-size:12px}.case-study-container{padding-left:15px;padding-right:15px}.cs-top h1{font-size:46px}.contents-links{display:grid;grid-template-columns:1fr 1fr;gap:9px}.case-section{padding-bottom:80px}.problem-grid,.persona-grid,.quad-grid,.journey-grid,.solution-gallery,.service-grid,.stakeholder-grid,.sense-grid,.systems-grid,.visual-grid,.visual-style-layout,.phone-grid{grid-template-columns:1fr}.phone-grid{justify-items:start}.phone-stage{width:min(100%,360px)}.table-wrap table{min-width:680px}.cs-footer{margin-top:60px}.next-case strong{font-size:20px}}
`
