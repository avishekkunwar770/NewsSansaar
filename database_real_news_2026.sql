-- Real News Data for NewsSansaar (2026)
-- This file adds 50 real news articles across 5 categories
-- Run this after database_setup_simple.sql

USE nepnews;

-- Clear existing news (optional - comment out if you want to keep existing data)
-- DELETE FROM news;

-- ============================================
-- POLITICS NEWS (10 articles)
-- ============================================

INSERT INTO news (title, description, category, thumbnail, admin, status, views, date) VALUES

('2026 US Midterm Elections Set to Reshape Congress',
'All 435 seats in the U.S. House of Representatives and 35 of the 100 seats in the U.S. Senate will be contested in the upcoming midterm elections. Political analysts predict this election will be crucial in determining the direction of the second Trump administration, with both parties preparing for competitive primaries across multiple states.',
'Politics', 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800', 'Admin', 'published', 2450, '2026-02-10 14:30:00'),

('Over 40 Countries to Hold National Elections in 2026',
'More than 40 countries representing a combined population of 1.6 billion people will hold national-level elections throughout 2026. This unprecedented wave of democratic participation is expected to reshape global political landscapes and international relations for years to come.',
'Politics', 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800', 'Admin', 'published', 1890, '2026-02-09 10:15:00'),

('36 US States Prepare for Gubernatorial Elections',
'The United States gubernatorial elections scheduled for November 3, 2026, will take place in 36 states and three territories. These elections are expected to have significant implications for state-level policy implementation and the 2028 presidential race.',
'Politics', 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800', 'Admin', 'published', 1650, '2026-02-08 16:45:00'),

('Democrats Chart Narrow Path to Senate Control',
'Democratic strategists are mapping out potential pathways to regain Senate control in the 2026 midterms, focusing on key races in Texas, Maine, and Michigan. Recent polling and voter registration trends have given party leaders cautious optimism despite facing a challenging electoral map.',
'Politics', 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800', 'Admin', 'published', 2120, '2026-02-07 11:20:00'),

('Congressional Redistricting Sparks Political Debate',
'The first round of primaries on March 3 comes as redistricting efforts continue to reshape congressional districts nationwide. Democrats have placed voter referendums on ballots in several states that could pave the way for new congressional maps, while Republicans defend existing boundaries.',
'Politics', 'https://images.unsplash.com/photo-1555374018-13a8994ab246?w=800', 'Admin', 'published', 1780, '2026-02-06 09:30:00'),

('MAGA Purity Tests Roil Republican Primary Season',
'As primary season heats up, Republican candidates face intense scrutiny over their loyalty to former President Trump. The internal party dynamics are creating competitive primaries in traditionally safe districts, with establishment figures challenged by insurgent candidates.',
'Politics', 'https://images.unsplash.com/photo-1551135049-8a33b5883817?w=800', 'Admin', 'published', 1920, '2026-02-05 13:45:00'),

('Texas Senate Race Draws National Attention',
'Both parties have competitive primaries for what will be a consequential Texas Senate race in November. Rep. Jasmine Crockett faces state Rep. James Talarico on the Democratic side, while longtime Sen. John Cornyn has drawn Republican challengers including Rep. Wesley Hunt and state attorney general Ken Paxton.',
'Politics', 'https://images.unsplash.com/photo-1577495508326-19a1b3cf65b7?w=800', 'Admin', 'published', 2340, '2026-02-04 15:10:00'),

('Left Debates Leadership Direction Ahead of Midterms',
'Progressive and moderate Democrats are engaged in intense discussions about the party direction heading into the midterm elections. Key policy debates center on economic priorities, healthcare reform, and climate action, with implications for candidate recruitment and campaign messaging.',
'Politics', 'https://images.unsplash.com/photo-1591117207239-788bf8de6c3b?w=800', 'Admin', 'published', 1560, '2026-02-03 10:25:00'),

('National Electoral Calendar Fills with Key Dates',
'The 2026 national electoral calendar is taking shape with primary dates, registration deadlines, and general election schedules being finalized across all 50 states. Election officials are preparing for what is expected to be high voter turnout amid intense political engagement.',
'Politics', 'https://images.unsplash.com/photo-1586795251616-f7d7b8b60c9f?w=800', 'Admin', 'published', 1430, '2026-02-02 14:50:00'),

('Voter Registration Trends Show Shifting Demographics',
'New voter registration data reveals significant demographic shifts that could impact the 2026 midterm elections. Young voters and minority communities are registering in record numbers, while traditional voting blocs show signs of realignment across party lines.',
'Politics', 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800', 'Admin', 'published', 1690, '2026-02-01 11:35:00');

-- ============================================
-- BUSINESS NEWS (10 articles)
-- ============================================

INSERT INTO news (title, description, category, thumbnail, admin, status, views, date) VALUES

('Global Economy Projected to Grow 2.7% in 2026',
'The global economy is entering 2026 with surprising resilience and transformative momentum. While GDP is projected to grow a steady 2.7 percent, beneath this stability lies an economy being fundamentally rewired by innovation, strategic adaptation and new opportunities across emerging markets.',
'Business', 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800', 'Admin', 'published', 3120, '2026-02-11 09:20:00'),

('Inflation Expected to Hit 3.5% Despite Policy Measures',
'Economic forecasters predict inflation will reach an uncomfortable 3.5 percent in 2026, while the dominance of big government spending will contribute to limited growth potential of under 2 percent. Slow wage growth and rising prices are expected to have a fragmented impact on households, hitting middle earners hardest.',
'Business', 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800', 'Admin', 'published', 2780, '2026-02-10 13:45:00'),

('AI-Capex Boom Anchors Economic Growth Prospects',
'Key factors expected to shape the 2026 macro landscape include an AI-capex boom anchoring growth and productivity. Major technology companies are investing billions in artificial intelligence infrastructure, creating ripple effects across the broader economy and labor markets.',
'Business', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800', 'Admin', 'published', 2450, '2026-02-09 10:30:00'),

('Global Debt Exceeds $337 Trillion Milestone',
'World economic outlook shows global debt has exceeded 337 trillion dollars, with productivity stagnating and aging populations weighing on labor supply. Trade barriers and geopolitical frictions are keeping the world locked in a low-growth regime, according to international financial institutions.',
'Business', 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800', 'Admin', 'published', 2890, '2026-02-08 15:15:00'),

('Two-Speed Global Recovery Takes Shape',
'Supply-side shocks are reinforcing a two-speed global recovery, with advanced economies showing resilience while emerging markets face headwinds. The International Monetary Fund and World Bank project global GDP growth ranging from 2.6 to 3.2 percent, below pre-pandemic averages.',
'Business', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800', 'Admin', 'published', 2340, '2026-02-07 11:50:00'),

('Sticky Core Inflation Limits Federal Reserve Flexibility',
'Sticky core inflation is limiting the Federal Reserve flexibility in monetary policy decisions. Central bank officials are navigating a complex environment where traditional policy tools face constraints amid persistent price pressures in key sectors of the economy.',
'Business', 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800', 'Admin', 'published', 2120, '2026-02-06 09:25:00'),

('Trade Tensions Weigh on Global Economic Momentum',
'Trade tensions, policy uncertainty and structural shifts are weighing on economic momentum in 2026. Business leaders are adapting strategies to navigate an increasingly complex international trade environment marked by tariff concerns and supply chain realignments.',
'Business', 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800', 'Admin', 'published', 1980, '2026-02-05 14:40:00'),

('Treasury Secretary Predicts Blockbuster US Economy',
'Treasury Secretary Scott Bessent predicts a blockbuster 2026 for the US economy as the Dow hits historic milestones. The administration points to early policy results showing positive economic indicators, though economists remain divided on long-term sustainability.',
'Business', 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800', 'Admin', 'published', 2650, '2026-02-04 10:15:00'),

('Energy-Efficient Computing Cuts Power Use by 40%',
'Advanced cooling technologies and hybrid computing systems are cutting power usage by 40 percent in data centers. The shift toward energy-efficient infrastructure is driven by both environmental concerns and the need to manage operational costs in the AI era.',
'Business', 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800', 'Admin', 'published', 2230, '2026-02-03 13:30:00'),

('Aging Populations Impact Labor Supply Globally',
'Demographic shifts with aging populations are significantly impacting labor supply across developed economies. Governments and businesses are implementing strategies to address workforce challenges, including automation, immigration policy reforms, and extended retirement ages.',
'Business', 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800', 'Admin', 'published', 1890, '2026-02-02 16:20:00');

-- ============================================
-- TECHNOLOGY NEWS (10 articles)
-- ============================================

INSERT INTO news (title, description, category, thumbnail, admin, status, views, date) VALUES

('Agentic AI Market to Reach $52 Billion by 2030',
'The agentic AI market is expected to grow from 7.8 billion dollars to over 52 billion dollars by 2030. These autonomous systems that reason, plan, and execute complex multi-step tasks are transforming enterprise workflows and redefining how businesses operate in the digital age.',
'Technology', 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800', 'Admin', 'published', 4230, '2026-02-11 10:45:00'),

('AI Systems Now Interpret Brain MRI Scans in Seconds',
'Researchers at the University of Michigan have created an AI system that can interpret brain MRI scans in just seconds, accurately identifying a wide range of neurological conditions and determining which cases need urgent care. The breakthrough could revolutionize emergency medical response.',
'Technology', 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800', 'Admin', 'published', 3890, '2026-02-10 14:20:00'),

('Humanoid Robots Walk Factory Floors, Learn by Observation',
'Humanoid robots are now walking factory floors and learning household chores by observation. This represents a major leap in robotics technology, with machines capable of adapting to new tasks without extensive reprogramming, marking a shift toward truly autonomous systems.',
'Technology', 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800', 'Admin', 'published', 3560, '2026-02-09 11:30:00'),

('Autonomous AI Market Hits $11.79 Billion Milestone',
'According to Research Nester, the autonomous AI market has hit 11.79 billion dollars in 2026, growing at a CAGR above 40 percent. This marks one of the latest technology trends redefining enterprise workflows, blending automation, reasoning, and adaptability in unprecedented ways.',
'Technology', 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800', 'Admin', 'published', 3240, '2026-02-08 09:15:00'),

('Quantum Computing Moves from Theory to Planning',
'Enterprise leaders are facing a new reality where quantum threats move from theory to planning. Organizations are beginning to implement quantum-resistant encryption and security measures as quantum computing capabilities advance toward practical applications.',
'Technology', 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800', 'Admin', 'published', 2980, '2026-02-07 15:40:00'),

('AI Governance Platforms Drive Compliance Growth',
'AI Governance Platforms and Model Risk Management are experiencing rapid growth, with North America holding 33.2 percent market share. The EU AI Act is driving compliance and lifecycle oversight growth as organizations adapt to new regulatory requirements.',
'Technology', 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800', 'Admin', 'published', 2670, '2026-02-06 10:25:00'),

('On-Device AI Processing Transforms Mobile Computing',
'On-device AI processing is transforming mobile computing, allowing smartphones and tablets to run sophisticated AI models without cloud connectivity. This shift addresses privacy concerns while enabling faster response times and reduced data costs for consumers.',
'Technology', 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800', 'Admin', 'published', 3120, '2026-02-05 13:50:00'),

('Industry Cloud Platforms Define Competitive Advantage',
'Industry cloud platforms are defining competitive advantage as enterprise leaders navigate 2026. These specialized platforms offer sector-specific tools and integrations that enable businesses to innovate faster and respond more effectively to market demands.',
'Technology', 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800', 'Admin', 'published', 2450, '2026-02-04 11:15:00'),

('Liquid Cooling Technology Improves Chip Efficiency',
'Advanced liquid-cooling technology is dramatically improving chip efficiency per watt. Data centers and high-performance computing facilities are adopting these systems to manage the heat generated by increasingly powerful processors while reducing energy consumption.',
'Technology', 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800', 'Admin', 'published', 2780, '2026-02-03 14:30:00'),

('AI Agents Automate Entire Enterprise Workflows',
'AI agents are now automating entire workflows in enterprise environments. These systems set goals and act on them autonomously, planning, executing, and adapting like digital coworkers, fundamentally changing how organizations approach productivity and efficiency.',
'Technology', 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800', 'Admin', 'published', 3450, '2026-02-02 09:45:00');

-- ============================================
-- SPORTS NEWS (10 articles)
-- ============================================

INSERT INTO news (title, description, category, thumbnail, admin, status, views, date) VALUES

('India-Pakistan T20 World Cup Match Sends Airfares Soaring',
'Confirmation of the India-Pakistan T20 World Cup match on February 15 has sent airfares from Indian metros to Colombo skyrocketing. The highly anticipated clash is drawing massive interest from cricket fans across both nations, with hotels and travel packages selling out rapidly.',
'Sports', 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800', 'Admin', 'published', 5670, '2026-02-11 15:30:00'),

('England Defeats Scotland by Five Wickets in T20 World Cup',
'Tom Banton led England to a hard-fought five-wicket victory over Scotland in their second match of the T20 World Cup. The match played at Eden Gardens in Kolkata saw England bounce back from their earlier loss to the West Indies, moving up to second place in Group C.',
'Sports', 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800', 'Admin', 'published', 4230, '2026-02-10 18:45:00'),

('Abhishek Sharma Hospitalized Ahead of Namibia Clash',
'Indian opener Abhishek Sharma has been admitted to a Delhi hospital with a stomach infection ahead of the T20 World Cup match against Namibia. The development puts Team India in a tough spot as they prepare for their crucial group stage encounter.',
'Sports', 'https://images.unsplash.com/photo-1546608235-3310a2494cdf?w=800', 'Admin', 'published', 3890, '2026-02-09 12:20:00'),

('Afghanistan and South Africa Battle Through Double Super Over',
'In a thrilling T20 World Cup encounter, Afghanistan and South Africa played through two Super Overs. Azmatullah Omarzai struck Lungi Ngidi for two fours and a six in the first Super Over, but Tristan Stubbs hit two sixes off Fazalhaq Farooqi to force another dramatic finish.',
'Sports', 'https://images.unsplash.com/photo-1593766787879-e8c78e09cec5?w=800', 'Admin', 'published', 4560, '2026-02-08 20:15:00'),

('Ireland Captain Paul Sterling Ruled Out of T20 World Cup',
'Ireland captain Paul Stirling has been ruled out of the ICC T20 World Cup 2026 due to injury. Group B teams are battling serious injury setbacks in the tournament, with Ireland and Zimbabwe suffering major leadership blows while Australia also deals with key absentees.',
'Sports', 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=800', 'Admin', 'published', 3120, '2026-02-07 14:30:00'),

('West Indies Aim to Maintain Dominance Against England',
'The West Indies aim to maintain their dominant form as they face England in a crucial T20 World Cup clash. Chase comes in for Forde in the West Indies lineup, while England replaces Wood with Overton as both teams beef up their strategies for the knockout stages.',
'Sports', 'https://images.unsplash.com/photo-1512719994953-eabf50895df7?w=800', 'Admin', 'published', 3780, '2026-02-06 16:45:00'),

('Winter Olympics 2026 Opening Ceremony Set for Milan-Cortina',
'The world is set to witness a spectacular start to the Winter Olympics 2026 as the Milan-Cortina Games officially open with a grand opening ceremony in Italy. Athletes from over 90 nations will compete in various winter sports disciplines across multiple venues.',
'Sports', 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800', 'Admin', 'published', 4890, '2026-01-30 19:00:00'),

('Anrich Nortje Ruled Out of South Africa Opening Match',
'South Africa pacer Anrich Nortje will not play the T20 World Cup 2026 match against Canada. The fast bowler injury is a significant blow to the Proteas as they prepare for their opening encounter in the tournament.',
'Sports', 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=800', 'Admin', 'published', 2890, '2026-02-05 11:25:00'),

('Pakistan Captain Hopes for Abhishek Sharma Recovery',
'Pakistan captain Salman Ali Agha has expressed hopes that India opener Abhishek Sharma recovers in time for their crucial World Cup clash. The gesture of sportsmanship has been widely appreciated by cricket fans across both nations.',
'Sports', 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=800', 'Admin', 'published', 3340, '2026-02-04 13:50:00'),

('T20 World Cup Group Stages Reach Critical Phase',
'The T20 World Cup group stages are reaching a critical phase with several teams fighting for knockout berths. Close matches and unexpected results have kept fans on the edge of their seats, making this one of the most competitive tournaments in recent memory.',
'Sports', 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800', 'Admin', 'published', 4120, '2026-02-03 17:30:00');

-- ============================================
-- ENTERTAINMENT NEWS (10 articles)
-- ============================================

INSERT INTO news (title, description, category, thumbnail, admin, status, views, date) VALUES

('28 Years Later: The Bone Temple Breaks Box Office Records',
'The sequel to 28 Years Later has shattered box office records with director Nia DaCosta at the helm. The film follows Spike and the gang of zombie killers, with Cillian Murphy reprising his role as Jim from 28 Days Later, delivering a thrilling post-apocalyptic experience.',
'Entertainment', 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800', 'Admin', 'published', 5230, '2026-02-11 11:20:00'),

('Christopher Nolan The Odyssey Set for Epic 2026 Release',
'Christopher Nolan returns to the big screen in 2026 with The Odyssey, an ambitious adaptation of the classic Greek epic. The film promises to showcase Nolan signature visual storytelling and complex narrative structure, generating massive anticipation among cinema enthusiasts.',
'Entertainment', 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800', 'Admin', 'published', 4780, '2026-02-10 14:35:00'),

('Sam Raimi Send Help Marks Return to Horror Roots',
'Sam Raimi return-to-form with Send Help has critics praising the director for doing exactly what he does best. The horror film delivers the signature Raimi style that fans have been craving, combining practical effects with innovative camera work.',
'Entertainment', 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800', 'Admin', 'published', 4120, '2026-02-09 16:50:00'),

('Marvel Avengers: Doomsday Features Robert Downey Jr Return',
'The 39th film in the Marvel Cinematic Universe, directed by the Russo brothers and starring Robert Downey Jr., Pedro Pascal, and Chris Hemsworth, is expected to land on December 18, 2026. The highly anticipated film marks a major turning point in the MCU narrative.',
'Entertainment', 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800', 'Admin', 'published', 6340, '2026-02-08 10:15:00'),

('Wuthering Heights Adaptation Generates Massive Buzz',
'The upcoming Wuthering Heights adaptation is generating unprecedented buzz among literary and film enthusiasts. Critics predict the film will drive audiences insane with its faithful yet innovative take on Emily Brontë classic novel.',
'Entertainment', 'https://images.unsplash.com/photo-1574267432644-f610f5293744?w=800', 'Admin', 'published', 3890, '2026-02-07 13:25:00'),

('Ridley Scott The Dog Stars Promises Sci-Fi Spectacle',
'Ridley Scott returns with The Dog Stars, a science fiction film that promises to deliver the visual grandeur and thought-provoking themes the director is known for. Early footage has generated excitement about Scott continued mastery of the genre.',
'Entertainment', 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800', 'Admin', 'published', 4230, '2026-02-06 15:40:00'),

('2026 Entertainment Predictions Point to Cinema Renaissance',
'As 2026 approaches, entertainment is entering a moment of renewed confidence. After years shaped by streaming saturation and franchise fatigue, the year ahead promises big cinema moments, intentional star power, and music that feels personal again.',
'Entertainment', 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=800', 'Admin', 'published', 3560, '2026-02-05 11:50:00'),

('Primate Delivers Fun Killer Chimpanzee Slasher Experience',
'The super fun silly slasher about a killer chimpanzee, Primate, has become an unexpected hit. The film embraces its absurd premise while delivering genuine scares and entertainment, proving that original concepts can still find audiences.',
'Entertainment', 'https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=800', 'Admin', 'published', 2980, '2026-02-04 14:20:00'),

('Music Industry Sees Return to Personal Storytelling',
'The music industry in 2026 is experiencing a shift toward personal storytelling and authentic artistry. Artists are moving away from algorithm-driven content toward music that feels genuine and emotionally resonant with listeners.',
'Entertainment', 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800', 'Admin', 'published', 3120, '2026-02-03 10:30:00'),

('Rising Stars Redefine Entertainment Landscape',
'A new generation of rising stars is redefining the entertainment landscape with fresh perspectives and diverse voices. These emerging talents are bringing innovation to film, television, and music, signaling a transformative period for the industry.',
'Entertainment', 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800', 'Admin', 'published', 3670, '2026-02-02 16:45:00');

-- Success message
SELECT 'Successfully added 50 real news articles!' AS message;
SELECT category, COUNT(*) as article_count FROM news GROUP BY category ORDER BY category;
