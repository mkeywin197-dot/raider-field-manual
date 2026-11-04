/* Hand-written guide content. Sources: ARC Raiders Wiki, official patch notes (arcraiders.com/news),
   LepreStore / PlayerAuctions / BoostingFactory / MMOExp / ARC Tracker guides (Oct 2026). Checked 2026-11-03. */
window.ARC = window.ARC || {};
window.ARC.meta = { updated: '2026-11-03', patch: '2.4.0' };

/* ---------- Skill trees ----------
   Branches: C = Conditioning, M = Mobility, S = Survival.
   Rules (wiki): 1 point per level (76 at level 75), up to 5 per Expedition (max +15).
   Large node 1 opens at 10 points in its branch (pick 1 of 2). Large node 2: first pick at 30, second at 40 (pick up to 2 of 3).
   Respec: 2,000 Coins per spent point, whole tree only. */
window.ARC.skillInfo = {
  C: { name: 'Conditioning', blurb: 'Carry weight, stamina recovery, breaching and the downed state.',
    nodes: [['Used To The Weight',1,'Wearing a shield slows you down less. Starting node.'],['Three Deep Breaths',5,'Recover faster after an ability drains stamina.'],['Vigorous Vaulter',1,'Vaulting is no longer slowed while exhausted.'],['Stubborn Mule',5,'Stamina regen is less affected by over-encumbrance.'],["Vault 'N' Carry",1,'Vault while holding a carryable.'],["Mule's Gallop",'Choice 1A','Sprint while over-encumbered. (10-point choice)'],['Back On Your Feet','Choice 1B','When critically hurt, health regenerates up to a limit. (10-point choice)'],['Downed But Determined',5,'Longer before you collapse when downed (~6s per rank on a 100s base).'],['Crawl Before You Walk',5,'Crawl faster while downed.'],['Broad Shoulders',5,'+2 max carry weight per rank (+10 total).'],['Speedy Mule',5,'Smaller speed penalty when severely over-encumbered.'],['Loaded Arms',1,'Your equipped weapon counts less toward encumbrance.'],['Proficient Pryer',5,'Breach doors and containers faster (doors 10s → 7s at max).'],['Security Breach','Capstone','Breach Security Lockers. (30/40-point choice)'],['Weapon Bash','Capstone','Melee with your equipped weapon. (30/40-point choice)'],['Bull Rush','Capstone','Weapon stowed: knock back players and ARC while sprinting. (30/40-point choice)']] },
  M: { name: 'Mobility', blurb: 'Stamina, climbing, rolling, sliding and sprint capstones.',
    nodes: [['Youthful Lungs',1,'More max stamina. Starting node.'],['Sure-Footed Scrambler',5,'Scramble up steep slopes longer while sprinting.'],['Ready To Roll',5,'Bigger timing window for a Recovery Roll when falling.'],['Nimble Climber',5,'Climb and vault faster.'],['Fight Or Flight',5,'Regain stamina when hurt in combat (cooldown).'],['Vault Spring','Choice 1A','Jump at the end of a vault. (10-point choice)'],['Vaults On Vaults On Vaults','Choice 1B','Vaulting costs no stamina. (10-point choice)'],['Effortless Roll',5,'Dodge rolls cost less stamina.'],['Slip And Slide',5,'Slide further and faster.'],['Right Back At It',1,'Get up faster after a heavy landing.'],['Off The Wall',5,'Wall Leap further.'],['Marathon Runner',5,'Moving costs less stamina.'],['Swift Start',5,'Longer burst of speed at the start of a sprint.'],['Sprinting On Fumes','Capstone','Stamina never fully drains while sprinting; any action or damage cancels it, and recovery scales with duration. Since 2.1, stamina items and Fight or Flight no longer skip the penalty.'],['Wall Run','Capstone','Sprint at a wall to run up it a few steps.'],['In The Flow','Capstone','Chaining mobility moves while sprinting adds speed and cuts stamina cost.']] },
  S: { name: 'Survival', blurb: 'Looting speed, stealth, field crafting and in-raid repair.',
    nodes: [['In-round Crafting',1,'Field-craft bandages, shield rechargers, Li\'l Smokes, impact grenades and more. Starting node.'],["Looter's Instincts",5,'Loot is revealed faster when searching.'],['Silent Scavenger',5,'Less noise while looting.'],['Sturdy Ankles',5,'Less fall damage from non-lethal heights.'],['Agile Croucher',5,'Faster crouch movement.'],['Quick Roll','Choice 1A','Faster, cheaper, shorter dodge roll. (10-point choice)'],['Minesweeper','Choice 1B','Defuse mines and explosive deployables up close. (10-point choice)'],['Gentle Pressure',5,'Less noise when breaching.'],['A Little Extra',1,'Breaching gives 1–2 crafting materials.'],['Traveling Tinkerer',1,'Field-craft traps, Noisemaker, Herbal Bandage and Raider Hatch Keys.'],["Looter's Luck",5,'Chance to reveal two items at once.'],['Stylish Landing',5,'Recovery Roll from higher up.'],['Turtle Crawl',5,'Take less damage while downed.'],['Road Warrior','Capstone','More ammo and ARC Powercells from ARC; recycle at full efficiency in a raid.'],['Nomadic Crafting','Capstone','Field-craft ammo, Shrapnel Grenades, Defibrillators and Ziplines.'],['Field Repair','Capstone','Repair weapons, shields and gadgets up to 30% durability in a raid.']] }
};

// Each step: [branch, skill, points, note]. Points accumulate in order; capstones are flagged by note starting with '★'.
window.ARC.builds = [
  { id: 'mix', name: 'The Mix', split: '31 / 31 / 14', tagline: 'For squads that loot, fight ARC and take Raider fights when they come. A good default.',
    capstones: ['Security Breach', 'Sprinting On Fumes'],
    why: 'Security Breach gets you into Security Lockers (the main source of augment blueprints). Sprinting On Fumes is your get-out-of-trouble button. Carry perks keep you moving with a full bag. You skip most downed-state perks because your squad can revive you.',
    steps: [
      ['M','Youthful Lungs',1,''],['C','Used To The Weight',1,''],['S','In-round Crafting',1,'Field-craft bandages and shield rechargers right away'],
      ['M','Nimble Climber',5,''],['M','Marathon Runner',5,''],['M','Vault Spring',1,'10-point choice in Mobility'],
      ['C','Broad Shoulders',5,'+10 carry weight'],['S',"Looter's Instincts",5,''],['M','Effortless Roll',5,''],
      ['C','Three Deep Breaths',5,''],['C',"Mule's Gallop",1,'10-point choice: sprint while overloaded'],
      ['S','Silent Scavenger',4,''],['S','Quick Roll',1,'10-point choice in Survival'],
      ['M','Swift Start',5,''],['M','Fight Or Flight',5,''],['C','Stubborn Mule',5,''],
      ['M','Right Back At It',1,''],['M','Off The Wall',2,''],['M','Sprinting On Fumes',1,'★ Mobility capstone (30 points in)'],
      ['C','Vigorous Vaulter',1,''],['C','Loaded Arms',1,''],['C',"Vault 'N' Carry",1,''],['C','Speedy Mule',5,''],['C','Proficient Pryer',5,''],
      ['C','Security Breach',1,'★ Conditioning capstone (30 points in)'],
      ['S','Traveling Tinkerer',1,''],['S',"Looter's Luck",2,'']
    ],
    expedition: [
      ['+5 (1 Expedition)', [['M','Slip And Slide',5,'']]],
      ['+10 (2 Expeditions)', [['M','Off The Wall',3,''],['M','Sure-Footed Scrambler',1,''],['M','In The Flow',1,'★ Second Mobility capstone (40 points in)']]],
      ['+15 (3 Expeditions)', [['S',"Looter's Luck",3,''],['S','Gentle Pressure',1,''],['S','A Little Extra',1,'']]]
    ] },
  { id: 'pvp', name: 'PvP Fighter', split: '24 / 41 / 11', tagline: 'For the squad member who takes Raider fights, flanks and moves fast.',
    capstones: ['Sprinting On Fumes', 'In The Flow'],
    why: 'Two Mobility capstones make you the hardest Raider in the lobby to pin down. Back On Your Feet and Downed But Determined buy time for your squad to revive you. Leave Security Lockers to a teammate running The Mix or Looter.',
    steps: [
      ['M','Youthful Lungs',1,''],['M','Nimble Climber',5,''],['M','Marathon Runner',5,''],['M','Vault Spring',1,'10-point choice in Mobility'],
      ['M','Effortless Roll',5,'Roll more in fights'],['M','Fight Or Flight',5,'Stamina back when you get shot'],
      ['C','Used To The Weight',1,''],['C','Three Deep Breaths',5,''],['M','Swift Start',5,''],
      ['S','In-round Crafting',1,''],['S',"Looter's Instincts",5,''],['S','Silent Scavenger',4,''],['S','Quick Roll',1,'10-point choice: the faster roll'],
      ['M','Slip And Slide',3,''],['M','Sprinting On Fumes',1,'★ Mobility capstone (30 points in)'],
      ['C','Broad Shoulders',5,''],['C','Back On Your Feet',1,'10-point choice: regen when critically hurt'],['C','Downed But Determined',5,''],
      ['M','Slip And Slide',2,''],['M','Off The Wall',5,''],['M','Right Back At It',1,''],['M','Sure-Footed Scrambler',1,''],
      ['M','In The Flow',1,'★ Second Mobility capstone (40 points in)'],
      ['C','Stubborn Mule',3,''],['C','Vigorous Vaulter',1,''],['C','Loaded Arms',1,''],['C','Crawl Before You Walk',2,'']
    ],
    expedition: [
      ['+5 (1 Expedition)', [['C','Stubborn Mule',2,''],['C','Speedy Mule',3,'']]],
      ['+10 (2 Expeditions)', [['C','Proficient Pryer',1,''],['C','Security Breach',1,'★ Conditioning capstone (30 points in)'],['S',"Looter's Luck",3,'']]],
      ['+15 (3 Expeditions)', [['S',"Looter's Luck",2,''],['S','Agile Croucher',3,'']]]
    ] },
  { id: 'pve', name: 'PvE Looter', split: '31 / 14 / 31', tagline: 'For farming ARC, Security Lockers and materials. Fast, quiet looting with plenty of ammo.',
    capstones: ['Security Breach', 'Road Warrior'],
    why: 'Road Warrior means more ammo and ARC Powercells from every ARC you kill, plus full-efficiency recycling in the raid. Security Breach opens lockers. Looter\'s Luck and Silent Scavenger empty containers fast and quietly. With 2 Expeditions you reach Field Repair as well.',
    steps: [
      ['C','Used To The Weight',1,''],['S','In-round Crafting',1,''],['M','Youthful Lungs',1,''],
      ['S',"Looter's Instincts",5,''],['S','Silent Scavenger',4,''],['S','Quick Roll',1,'10-point choice in Survival'],
      ['C','Broad Shoulders',5,''],['M','Nimble Climber',5,''],['M','Marathon Runner',5,''],
      ['C','Three Deep Breaths',5,''],['C',"Mule's Gallop",1,'10-point choice: sprint while overloaded'],
      ['S',"Looter's Luck",5,'Reveal two items at once'],['S','Traveling Tinkerer',1,'Field-craft Raider Hatch Keys'],['S','A Little Extra',1,''],
      ['C','Speedy Mule',5,''],['C','Stubborn Mule',5,''],
      ['S','Gentle Pressure',5,''],['S','Sturdy Ankles',3,''],['S','Agile Croucher',3,''],['S','Turtle Crawl',1,''],
      ['S','Road Warrior',1,'★ Survival capstone (30 points in)'],
      ['C','Proficient Pryer',5,''],['C','Vigorous Vaulter',1,''],['C','Loaded Arms',1,''],['C',"Vault 'N' Carry",1,''],
      ['C','Security Breach',1,'★ Conditioning capstone (30 points in)'],
      ['M','Effortless Roll',3,'']
    ],
    expedition: [
      ['+5 (1 Expedition)', [['S','Sturdy Ankles',2,''],['S','Agile Croucher',2,''],['S','Stylish Landing',1,'']]],
      ['+10 (2 Expeditions)', [['S','Stylish Landing',4,''],['S','Field Repair',1,'★ Second Survival capstone (40 points in)']]],
      ['+15 (3 Expeditions)', [['M','Effortless Roll',2,''],['M','Vault Spring',1,'10-point choice in Mobility'],['M','Swift Start',2,'']]]
    ] }
];

/* ---------- Maps ---------- */
window.ARC.maps = [
  { id: 'dam', name: 'Dam Battlegrounds', best: 'New players; electrical and mechanical materials', exits: 'Cargo Elevator, Raider Hatch',
    pois: [['Control Tower (top floor)','Best weapon crates on the map. Heavily contested.','high'],['Research & Administration','Mixed containers, medical and equipment. Multiple floors invite third parties.','high'],['Controlled Access Zone','ARC and mechanical salvage. Has a fuel-cell and switch puzzle for its locked room.','high'],['Electrical Substation','Electrical containers, cables, spare parts.','mid'],['Water Treatment Control','Industrial containers; good backup if Research is busy.','mid'],['Hydroponic Dome Complex','Fertilizer and agricultural loot (Soul\'s Offering stage 3).','mid'],['Testing Annex','Locked room (Rare key).','high']],
    keys: [['Dam Staff Room Key','Uncommon'],['Dam Surveillance Key','Uncommon'],['Dam Testing Annex Key','Rare'],['Dam Controlled Access Zone Key','Rare'],['Dam Control Tower Key','Epic']],
    tips: ['Start here to learn the raid loop: two loot stops, then an elevator.','Open roads between buildings are where most PvP happens. Move along tree lines.'] },
  { id: 'buried', name: 'Buried City', best: 'Residential, commercial and medical loot; trinkets for projects', exits: 'Metro, Raider Hatch',
    pois: [['Hospital','Medical loot; check upper floors and exits.','high'],['Town Hall','Locked room (Rare key).','high'],['Space Travel building','Strong mixed loot; popular.','high'],['Piazza Arbusto','Compact commercial and medical run with many containers.','mid'],['Grandioso Apartments','Residential: Rock Salt, Fancy Plates, Dead Flowers and other trinkets.','mid'],['Santa Maria Houses','Residential; its rooftop is the Soul\'s Offering firework spot.','mid'],['Piazza Roma / Western Station','Mixed urban loot near a Metro exit.','mid']],
    keys: [['Buried City Residential Master Key','Uncommon'],['Buried City Hospital Key','Uncommon'],['Buried City Town Hall Key','Rare']],
    tips: ['Buildings are close together: lots of loot without crossing open ground, but lots of ambush angles too.','During Bird City, stay off the rooftops.'] },
  { id: 'spaceport', name: 'Spaceport', best: 'Weapon cases, industrial and technological salvage', exits: 'Cargo Elevator, Raider Hatch',
    pois: [['Control Tower A6','Take the zipline to the top for the best loot. Watch your way down.','high'],['Launch Towers','Equipment and event loot (Launch Tower Loot condition).','high'],['Departure Building','Ammo boxes, weapon cases, bags. Clear it floor by floor.','high'],['Container Storage','Industrial and weapon storage; has a keyed room (Rare).','mid'],['Arrival Building','Mixed loot.','mid'],['Trench Tower / Warehouse','Keyed rooms (Uncommon).','mid']],
    keys: [['Spaceport Warehouse Key','Uncommon'],['Spaceport Trench Tower Key','Uncommon'],['Spaceport Container Storage Key','Rare'],['Spaceport Control Tower Key','Rare']],
    tips: ['Long sightlines: cross open ground in short hops between cover.','Hidden Bunker: find 4 buttons to open the Outskirts Bunker.'] },
  { id: 'bluegate', name: 'The Blue Gate', best: 'Electrical and technology materials, keyed rooms', exits: 'Airshaft, Raider Hatch (not during Locked Gate)',
    pois: [["Pilgrim's Peak",'Electrical and technological loot; exposed approaches.','high'],['Ancient Fort','Old World and technological containers.','high'],['Reinforced Reception','Security-side loot; Locked Gate code location.','high'],['Maintenance Wing','Mixed containers and utility gear.','mid'],['Village','Residential; has a keyed room.','mid'],['Ruined Homestead','Farmhouses: the Outpost unlock photo. Dead Flowers too.','mid'],['Communication Tower','Locked room (Rare key).','high']],
    keys: [['Blue Gate Village Key','Uncommon'],['Blue Gate Cellar Key','Rare'],['Blue Gate Communication Tower Key','Rare'],['Blue Gate Confiscation Room Key','Epic']],
    tips: ['Hills make travel slow. Pick one side of the map and stay on it.','Locked Gate: grab the 4 key cards. Raider Hatches are off during this condition.'] },
  { id: 'stella', name: 'Stella Montis', best: 'Densest loot in the game: medical, tech, Exodus', exits: 'Metro, Airshaft, Raider Hatch',
    pois: [['Medical Research','Medical bags and healing loot.','high'],['Assembly Workshops','Technological materials; several short indoor stops.','high'],['Cultural Archives','Old World and commercial valuables; Epic-key Archives room.','high'],['Security Checkpoint / Bridge','Mixed containers; Rare-key room.','mid'],['Sandbox A and B','Machinery and ARC objectives.','mid'],['Lobby Metro','Exit-side scavenging.','mid']],
    keys: [['Stella Montis Assembly Admin Key','Uncommon'],['Stella Montis Medical Storage Key','Uncommon'],['Stella Montis Security Checkpoint Key','Rare'],['Stella Montis Archives Key','Epic']],
    tips: ['Indoors with several floors: learn the stairs near where you loot. The wrong staircase costs more time than the last few containers are worth.','Short sightlines favor SMGs and shotguns.','Not on the Frigate map list.'] },
  { id: 'riven', name: 'Riven Tides', best: 'Port cargo, hotel loot, Beachcombing; overall loot value +15% since 2.0', exits: 'Cargo Elevator, Raider Hatch',
    pois: [['Secure Storage','Epic keycard room.','high'],['Port Authority Building','Exodus and technological loot; Exodus Handbooks.','high'],['Hotel Panorama Azzurro','Commercial and residential; 7 room keycards (102–404).','high'],['Stacking Yard','Exodus and industrial; has a puzzle.','mid'],['Customs House','Electrical and industrial.','mid'],['Crane House','Uncommon keycard room.','mid'],['Azzurro Beach / Dried Riverbed','Beachcombing finds and nature resources.','mid']],
    keys: [['Hotel Keycards No. 102, 107, 113, 205, 208, 311, 404','Common'],['Riven Tides Classified Records Keycard','Uncommon'],['Riven Tides Crane House Keycard','Uncommon'],['Riven Tides Secure Storage Keycard','Epic']],
    tips: ['Pick either the hotel side or the port side for a short run.','ARC Turbines spawn far more reliably since 2.2. They lay motion mines, so crouch or stand still near them.'] },
  { id: 'pendola', name: 'Pendola Pass', best: 'Fallen Emperor, Bully/Skulker farming, Outpost materials', exits: 'Ballistic Gondola only (no hatches, no elevators)',
    pois: [['Fallen Emperor','The dungeon: Emperor Modulator and Amplification Modules. Needs an Emperor Gateway Conduit.','high'],['Cielo Sereno Observatory','Exodus and tech loot; Epic-key room; Railway Lanterns.','high'],['Train Station / Almatera Station','Rare-key room; Railway Lanterns.','high'],['Old Town','Old World and residential loot: Planks, Paperbacks, Dead Flowers, Rock Salt.','mid'],['Railyard','Industrial and mechanical: Sheet Metal, cables, tools.','mid'],['Commissary Supermarket','Commercial and medical; next to a gondola transceiver.','mid'],['Freight Terminal / Loading Platforms','Industrial and Exodus cargo.','mid']],
    keys: [['Pendola Pass Old Town Key','Uncommon'],['Pendola Pass Railyard Key','Uncommon'],['Pendola Pass Train Station Key','Rare'],['Pendola Pass Observatory Key','Epic']],
    tips: ['Dynamic Loot Zones: an area keeps its loot type but its value changes every raid, so check the map before you commit.','Flash Freeze: always know where the nearest shelter is.','Gondola: activate a transceiver (Supermarket, Glacial/Freight Terminal, Northern/Frozen River, Reckless/Piazza della Rupe). The craft lands near it, not on it. Seats are limited and ARC react when you call one.'] }
];

/* ---------- Map conditions ---------- */
window.ARC.conditions = [
  ['Night Raid','Major','Better loot behind locked doors, more keys, more ARC. Some attachment blueprints only drop here. "2x blueprints" is not confirmed.'],
  ['Electromagnetic Storm','Major','Lightning fries electronics, disrupts ARC and can electrocute you. Some level III attachment blueprints drop here.'],
  ['Cold Snap','Major','Snow and frostbite. Ripe Candleberry bushes.'],
  ['Hurricane','Major','Strong winds; reduced visibility and hearing.'],
  ['Close Scrutiny','Major','Groups of Surveyors and Vaporizers scanning for valuables. Good rewards if you can handle them.'],
  ['Hidden Bunker','Major','Spaceport: find 4 buttons to open the Outskirts Bunker.'],
  ['Locked Gate','Major','Blue Gate: collect 4 key cards to override the shutdown. Raider Hatches are disabled and fewer exits are open.'],
  ['ARC Frigate','Major','A warship hovers over the map. No Free Loadout, no Raider Hatches, locked rooms off, less ground loot. Board it via a Reclaimer.'],
  ['Harvester','Minor','A Harvester guarded by the Queen. Source of Jupiter and Equalizer blueprints.'],
  ['Matriarch','Minor','A Matriarch and her summoned ARC.'],
  ['Redirection','Minor','Pendola Pass: Emperor Beacons redirect payloads to you. Source of the Emperor Gateway Conduit blueprint and couplers.'],
  ['Beachcombing','Minor','Riven Tides: use a Dockmaster\'s Detector to dig up buried finds on the beaches.'],
  ['Bird City','Minor','Buried City: birds around chimneys. Avoid rooftops.'],
  ['Lush Blooms','Minor','More plants and fruit to gather.'],
  ['Prospecting Probes','Minor','Guarded ARC Probes come down in numbers.'],
  ['Husk Graveyard','Minor','Downed ARC husks everywhere: free parts and info.'],
  ['Uncovered Caches','Minor','Raider Caches exposed by storms; they explode if left exposed too long.'],
  ['Launch Tower Loot','Minor','Spaceport: loot locked at the top of the Launch Tower, with extra ARC defenses.']
];

/* ---------- Outpost ---------- */
window.ARC.outpost = {
  unlock: [
    ['Research Topside Living Conditions','Reach level 18. Take a Camera (Shani sells them, or craft one at the Workbench) to Ruined Homestead on The Blue Gate and photograph a farmhouse.','Advanced Camera Blueprint'],
    ['Gather Building Materials','Hand in 3 Planks, 5 Sheet Metal, 10 ARC Alloy, 3 Advanced Electrical Components. Celeste trades Planks and Sheet Metal for Assorted Seeds.','Red Light Stick Blueprint'],
    ['Safeguard the Building Site','Deal 800 damage to flying ARC and 300 to Bullies (Pendola Pass). Damage counts, not kills.','Hotel Chair Design, 15 Planks, 5 Durable Cloth, Outpost access']
  ],
  rooms: [
    [2,'3 Steel Cable, 20 Sheet Metal, 3 Cable Strippers','Research Station II'],
    [3,'3 Epoxy Buckets, 35 Planks, 3 Hand Drills','Research Station III'],
    [4,'40 Sheet Metal, 3 Laser Levels, 3 Insulation Rolls','Research Station IV and Gunsmith IV']
  ],
  order: ['Unlock the Outpost (Sheltered Retreat)','Research Station I','Room 2','Research Station II (needs 5 Skulker Targeters)','Room 3','Research Station III (needs 6 Bully Fragmenters)','Room 4','Research Station IV (needs a Frigate Inductor)','Gunsmith IV (3 Radial Press, 3 Magnetic Accelerator, 1 Emperor Modulator)'],
  modules: [
    ['Chalet','Plaster and wood, cozy cabin. Often called the best looking.','Rooms 2–3'],
    ['Timeless','Post-apocalyptic, chipped paint, split into small sub-rooms with a ladder loft. Few windows.','Rooms 2–3'],
    ['Panoramic','One large open floor. Its rack spot is the wall near the door; older posts said it had none, but that was wrong.','Rooms 2–3'],
    ['Studious','Big circular hall with a skylight. Reported to appear only as the final (4th) room.','Room 4']
  ],
  rp: [['Battered Paperback',50],['Raider Logbook',100],['Exodus Technical Handbook',150],['ARC Data Module',200],['Frigate Diagnostic Node',1000]],
  storage: [
    ['Sturdy Weapon Rack','4 guns','10 Sheet Metal','Sheltered Retreat stage 3. The best value.'],
    ['Polished Weapon Rack','4 guns','20 Sheet Metal, 10 Plastic Parts','Same capacity, costs more'],
    ['Battered Weapon Rack','3 guns','10 Sheet Metal','Skip it: one slot fewer for the same price'],
    ['Sturdy Shelf','24 item slots','25 Sheet Metal, 5 Plastic Parts','Found design, or Research II for 1,000 RP + 1 Rusted Bolts'],
    ['Diner Cupboard','16 item slots','20 Planks, 1 Metal Brackets','Found design, or Research II'],
    ['Warehouse Dresser','5 item slots','20 Sheet Metal, 4 Plastic Parts','Research II: 1,000 RP + 30 Sheet Metal']
  ]
};

/* ---------- Patch log ---------- */
window.ARC.patches = [
  ['2026-11-03','2.4.0','Dead Eye Set in the store; Raider Tool skin fix.'],
  ['2026-10-27','2.3.0','Heavy Shield base charge 80 → 90. Emperor loot moved deeper (entrance containers now low-tier). Expedition Vault disabled, contents moved to stash. Soul\'s Offering project starts (until Nov 16). Camera bob option added.'],
  ['2026-10-20','2.2.0','Hydra targets spread correctly, with higher base damage. ARC Turbines spawn far more reliably on Buried City, Riven Tides, Blue Gate and Spaceport. ARC react to gondola transceivers. Frigate cargo-ride fixes. "Ascend" renamed "Amplify".'],
  ['2026-10-13','2.1.0','Sprinting On Fumes penalty can no longer be skipped. Frigate hatches burn when opening. Gondola marker visible from 175 m. PvE toggle beta (Oct 13–20).'],
  ['2026-10-08','2.0 Frozen Trail','Pendola Pass, Frigate, Bully/Skulker/Hydra, Outpost and Research Station, Amplified Weapons (Level V), Stiletto and Bantam, Grappling Hook, Tether Launcher, Yank Grenade, Camera, Weapon Stencils, Reward Pass, skill tree rework (13 skills removed). Anvil moved from Uncommon to Rare and lost its Tech Mod slot. Jupiter double-hit fixed. Riven Tides loot +15%.'],
  ['2026-04-28','1.26 Riven Tides','Riven Tides map and Beachcombing.'],
  ['2026-03-31','1.22 Flashpoint','Vaporizer ARC added.'],
  ['2026-02-24','1.17 Shrouded Sky','Major update.'],
  ['2025-12-16','Cold Snap','First winter update; first Expedition wipe that month.'],
  ['2025-10-30','Launch','ARC Raiders released.']
];

/* ---------- Extra search entries: [title, subtitle, href] ---------- */
window.ARC_SEARCH = [
  ['Outpost unlock (Sheltered Retreat)','Outpost · level 18 project','outpost.html#unlock'],
  ['Outpost rooms: Chalet, Timeless, Panoramic, Studious','Outpost · which room goes where','outpost.html#rooms'],
  ['Research Station costs','Outpost · I–IV materials','outpost.html#research'],
  ['Weapon racks and shelves','Outpost · storage furniture','outpost.html#storage'],
  ['Fallen Emperor walkthrough','Endgame · Emperor Modulator','endgame.html#emperor'],
  ['Frigate full clear','Endgame · Reclaimer, Power Cores, cargo','endgame.html#frigate'],
  ['Queen and Matriarch','Endgame · boss fights','endgame.html#bosses'],
  ['Amplified weapons requirements','Guns · Level V','weapons.html#amp-req'],
  ['Map conditions','Maps · Night Raid, Frigate, Locked Gate…','maps.html#conditions'],
  ['Pendola Pass gondola','Maps · extraction','maps.html#pendola'],
  ['Controller settings','Guides · Xbox and PS5','guides.html#controller'],
  ['Beginner guide','Guides · the raid loop','guides.html#beginner'],
  ["Soul's Offering",'Guides · Halloween project until Nov 16','guides.html#events'],
  ['Patch log','Guides · every update','guides.html#patches'],
  ['Material shopping list','Benches · tick upgrades, get totals','benches.html#shopping'],
  ['Squad role planner','Skills · who runs which build','skills.html#squad'],
  ['Mix build','Skills · 31/31/14','skills.html#mix'],['PvP build','Skills · 24/41/11','skills.html#pvp'],['PvE build','Skills · 31/14/31','skills.html#pve']
].concat(window.ARC.maps.map(m => [m.name, 'Map · ' + m.best, 'maps.html#' + m.id]));
