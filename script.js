const navButtons = document.querySelectorAll(".nav-btn");
const pages = document.querySelectorAll(".page");

const caseSearchInput = document.getElementById("case-search");

const difficultyFilter = document.getElementById("difficulty-filter");
const clearFiltersButton = document.getElementById("clear-filters-btn");

const resetProgressButton = document.getElementById("reset-progress-btn");

const casesContainer = document.getElementById("cases-container");

const investigationContainer = document.getElementById("investigation-container");

const completionRateElement = document.getElementById("completion-rate");

const completionProgressFill = document.getElementById("completion-progress-fill");

const totalCasesElement = document.getElementById("total-cases");
const solvedCasesElement = document.getElementById("solved-cases");
const unsolvedCasesElement = document.getElementById("unsolved-cases");

const caseModal = document.getElementById("case-modal");
const closeModalButton = document.getElementById("close-modal-btn");

const modalCaseTitle = document.getElementById("modal-case-title");
const modalCaseDescription = document.getElementById("modal-case-description");
const modalCaseLocation = document.getElementById("modal-case-location");
const modalCaseDifficulty = document.getElementById("modal-case-difficulty");

const modalInvestigateButton = document.getElementById("modal-investigate-btn");

const modalActionContainer = document.getElementById("modal-action-container");
const modalSolvedMessage = document.getElementById("modal-solved-message");

const toast = document.getElementById("toast");

const resetModal = document.getElementById("reset-modal");
const cancelResetButton = document.getElementById("cancel-reset-btn");
const confirmResetButton = document.getElementById("confirm-reset-btn");

const evidenceModal = document.getElementById("evidence-modal");
const cancelEvidenceButton = document.getElementById("cancel-evidence-btn");
const confirmEvidenceButton = document.getElementById("confirm-evidence-btn");

const evidenceModalTitle = document.getElementById("evidence-modal-title");
const evidenceModalDescription = document.getElementById("evidence-modal-description");

const clearNotesModal = document.getElementById("clear-notes-modal");
const cancelClearNotesButton = document.getElementById("cancel-clear-notes-btn");
const confirmClearNotesButton = document.getElementById("confirm-clear-notes-btn");

const accusationModal = document.getElementById("accusation-modal");
const accusationModalMessage = document.getElementById("accusation-modal-message");
const cancelAccusationButton = document.getElementById("cancel-accusation-btn");
const confirmAccusationButton = document.getElementById("confirm-accusation-btn");

let currentEvidenceId = null;
let currentCaseId = null;
let currentModalCaseId = null;
let currentAccusedSuspect = null;
let toastTimeout;


const cases = [

    {
        id: 1,
        title: "The missing diamond",
        description: "A valuable diamond disappeared during a dinner party and five people were inside the mansion and one of them is responsible",
        location: "Blackwood mansion",
        difficulty: "Easy",
        status: "unsolved",

        suspects: [
        {
            id: "victor",
            name: "Victor Hale",
            role: "Butler",
            description: "The mansion's butler, he has worked for the family for fifteen years and knows every room",
            statement: "I was in the library organizing some documents when the diamond disappeared",
            motive: "He recently got into serious financial trouble",
            investigated: false
        },
        {
            id: "eleanor",
            name: "Eleanor Blackwood",
            role: "The Owner's Niece",
            description: "The owner's niece, she was attending the dinner party and seemed unusually nervous",
            statement: "I stayed in the dining room talking to the guests all evening",
            motive: "She believes she deserves a larger share of the family fortune",
            investigated: false
        },
        {
            id: "daniel",
            name: "Daniel Reed",
            role: "Business Partner",
            description: "A business partner of the diamond's owner, Their relationship has recently become tense",
            statement: "I was in the smoking room making a phone call",
            motive: "His business has been losing money, and he needs cash",
            investigated: false
        },
        {
            id: "sophia",
            name: "Sophia Lane",
            role: "Housekeeper",
            description: "The housekeeper, she knows the mansion very well and has access to several private rooms",
            statement: "I was in the kitchen helping prepare the dinner",
            motive: "She recently argued with the owner about her salary",
            investigated: false
        },
        {
            id: "marcus",
            name: "Marcus Bell",
            role: "Gardener",
            description: "The gardener he was invited inside because of the bad weather",
            statement: "I was near the entrance checking whether the garden doors were locked",
            motive: "He was recently threatened with losing his job",
            investigated: false
        }
        ],

        
        evidence: [
            {
                id: 1,
                title: "The Broken Window",
                description: "A small window near the diamond's display room was found open. However, the glass pieces are outside the mansion.",
                discovered: false
            },
            {
                id: 2,
                title: "The Muddy Footprints",
                description: "Muddy footprints were found near the display room. They are unusually small and appear to come from indoor shoes.",
                discovered: false
            },
            {
                id: 3,
                title: "The Missing Key",
                description: "The spare key to the display room is missing. Only the butler is responsible for keeping track of the spare keys.",
                discovered: false
            },
            {
                id: 4,
                title: "The Financial Document",
                description: "A document found in the library reveals that someone has a large unpaid debt.",
                discovered: false
            },
            {
                id: 5,
                title: "The Security Camera",
                description: "The security camera stopped recording for ten minutes. The recording system was manually switched off.",
                discovered: false
            }
        ],

        notes: "",
        solution: "victor"

    },

    {
        id: 2,
        title: "The midnight murder",
        description: "A wealthy businessman was found dead in his office at midnight and three employees had access to the room",
        location: "The grand hotel",
        difficulty: "Medium",
        status: "unsolved",

        suspects: [
            {
                id: "adrian",
                name: "Adrian Cross",
                role: "Hotel Manager",
                description: "The hotel manager. He has worked at the Grand Hotel for twelve years and has access to every room",
                statement: "I was in my office checking the hotel's financial reports",
                motive: "The victim recently discovered serious financial irregularities in the hotel's accounts",
                investigated: false
            },
            {
                id: "clara",
                name: "Clara Bennett",
                role: "Hotel Singer",
                description: "A famous singer performing at the hotel. She had a private disagreement with the victim",
                statement: "I was in my dressing room preparing for my performance",
                motive: "The victim threatened to reveal a secret that could destroy her career",
                investigated: false
            },
            {
                id: "thomas",
                name: "Thomas Reed",
                role: "Waiter",
                description: "A waiter who served guests on the hotel's upper floors that evening",
                statement: "I was working in the restaurant until midnight",
                motive: "The victim had recently refused to pay him for several months of overtime",
                investigated: false
            },
            {
                id: "victoria",
                name: "Victoria Hayes",
                role: "Businesswoman",
                description: "A wealthy guest staying at the hotel. She had an important business relationship with the victim",
                statement: "I was in my hotel room making a phone call",
                motive: "The victim was planning to cancel an important business agreement",
                investigated: false
            }
        ],


        evidence: [
            {
                id: "keycard",
                title: "Master Keycard",
                description: "A master keycard was found near the victim's room. Access records show that it was used shortly before midnight",
                discovered: false
            },
            {
                id: "ledger",
                title: "Financial Ledger",
                description: "A hidden financial ledger reveals that large amounts of hotel money have been transferred into a private account",
                discovered: false
            },
            {
                id: "watch",
                title: "Broken Wristwatch",
                description: "A broken wristwatch was found near the crime scene, It stopped at exactly 11:45 PM",
                discovered: false
            },
            {
                id: "footage",
                title: "Security Footage",
                description: "Security footage shows someone entering the victim's floor shortly before midnight, but their face is not visible",
                discovered: false
            },
            {
                id: "document",
                title: "Hidden Document",
                description: "A document found in the victim's desk reveals that the hotel manager was about to be exposed for stealing money",
                discovered: false
            }
        ],

        solution: "adrian",
    },

    {
        id: 3,
        title: "The stolen painting",
        description: "A famous painting vanished from an art gallery during an exhibition the security system was mysteriously disabled",
        location: "Royal art gallery",
        difficulty: "Hard",
        status: "unsolved",

        suspects: [
            {
                id: "oliver",
                name: "Oliver Grant",
                role: "Gallery Curator",
                description: "The gallery curator. He has managed the Royal Art Gallery for eight years and knows its security systems",
                statement: "I was checking the exhibition rooms before closing",
                motive: "He secretly owes a large amount of money and recently tried to sell valuable artwork",
                investigated: false
            },
            {
                id: "isabella",
                name: "Isabella Moore",
                role: "Art Collector",
                description: "A wealthy art collector who attended the private exhibition",
                statement: "I was examining paintings in the east gallery",
                motive: "She desperately wanted to own The Golden Dawn but was repeatedly refused by the gallery",
                investigated: false
            },
            {
                id: "henry",
                name: "Henry Collins",
                role: "Security Guard",
                description: "The security guard responsible for monitoring the gallery cameras and entrances",
                statement: "I was watching the security monitors in the control room",
                motive: "He was recently threatened with dismissal after several security mistakes",
                investigated: false
            },
            {
                id: "sophie",
                name: "Sophie Turner",
                role: "Restoration Specialist",
                description: "An art restoration specialist who recently worked on several paintings in the gallery",
                statement: "I was working in the restoration laboratory",
                motive: "She believes the gallery took credit for her restoration work without rewarding her",
                investigated: false
            }
        ],

        evidence: [
            {
                id: "frame",
                title: "Empty Painting Frame",
                description: "The painting was removed carefully from its frame, there are no signs of forced entry",
                discovered: false
            },
            {
                id: "camera",
                title: "Security Camera Recording",
                description: "The recording shows that the security cameras were disabled for twelve minutes before the painting disappeared",
                discovered: false
            },
            {
                id: "shipping",
                title: "Suspicious Shipping Document",
                description: "A shipping document authorizes the transportation of a painting, but its signature appears to be forged",
                discovered: false
            },
            {
                id: "gloves",
                title: "Paint-Stained Gloves",
                description: "A pair of gloves was discovered in a storage room, they contain traces of the special varnish used in the gallery",
                discovered: false
            },
            {
                id: "access",
                title: "Access Log",
                description: "The access log reveals that someone used the curator's security credentials shortly before the theft",
                discovered: false
            }
        ],

        solution: "oliver",
    },

    {
        id: 4,
        title: "The Last Train",
        description: "A wealthy passenger disappears from his locked train compartment, and a confidential envelope is missing. Five people were nearby that night. One of them is responsible.",       
        location: "The Midnight Express",
        difficulty: "Easy",
        status: "unsolved",
        solution: "arthur",
        notes: "",

        suspects: [
            {
                id: "arthur",
                name: "Arthur Mills",
                role: "Train Conductor",
                description: "Arthur has worked on the Midnight Express for twelve years. He was responsible for checking the passengers' tickets and inspecting the carriages.",
                statement: "I checked Edward's ticket around 10 PM. After that, I continued my normal duties.",
                motive: "Edward recently discovered that Arthur was secretly selling passenger information.",
                investigated: false
            },
            {
                id: "clara",
                name: "Clara Bennett",
                role: "Businesswoman",
                description: "Clara was travelling in the compartment next to Edward's. She claims she was working throughout the journey.",
                statement: "I heard someone walking in the corridor, but I never left my compartment.",
                motive: "Edward had recently refused to invest in her struggling company.",
                investigated: false
            },
            {
                id: "benjamin",
                name: "Benjamin Carter",
                role: "Train Attendant",
                description: "Benjamin served food and drinks to passengers during the journey. He had access to several restricted areas.",
                statement: "I delivered tea to Edward at 9:30 PM. He seemed perfectly normal.",
                motive: "Edward had complained about Benjamin's behaviour and threatened to report him.",
                investigated: false
            },
            {
                id: "victor",
                name: "Victor Stone",
                role: "Business Rival",
                description: "Victor was travelling on the same train. He had a long history of disagreements with Edward.",
                statement: "I was asleep in my compartment. I had nothing to do with his disappearance.",
                motive: "Edward had recently won an important business contract that Victor desperately wanted.",
                investigated: false
            },
            {
                id: "elena",
                name: "Elena Morris",
                role: "Journalist",
                description: "Elena was writing an article about wealthy passengers travelling on luxury trains. She had been asking Edward several questions.",
                statement: "I spoke to Edward earlier that evening, but I didn't see him after dinner.",
                motive: "Edward had threatened to sue her after she tried to publish a story about his private affairs.",
                investigated: false
            }
        ],

        evidence: [
            {
                id: "train-ticket",
                title: "An Altered Train Ticket",
                description: "A train ticket was found near Edward's compartment. The time printed on it appears to have been changed. The handwriting matches Arthur's duty records.",
                discovered: false
            },
            {
                id: "service-key",
                title: "The Service Key",
                description: "A small key was discovered under a seat in the corridor. It opens a restricted service door that only train employees can access.",
                discovered: false
            },
            {
                id: "missing-record",
                title: "The Missing Inspection Record",
                description: "The official inspection record shows that Arthur checked Edward's compartment at 10:15 PM. However, the original entry appears to have been removed and rewritten.",
                discovered: false
            },
            {
                id: "torn-envelope",
                title: "A Torn Envelope",
                description: "A piece of an envelope was found inside the service compartment. It contains part of Edward's name and a fingerprint belonging to Arthur.",
                discovered: false
            },
            {
                id: "station-footage",
                title: "Station Security Footage",
                description: "Security footage from the previous station shows Arthur carrying a large empty suitcase shortly before the train departed. He claimed he had not handled any passenger luggage that evening.",
                discovered: false
            }
        ]
    },

    {
        id: 5,
        title: "The Secret in Room 13",
        description: "A hotel guest is found unconscious in a locked room, and a confidential letter is missing. Five people visited him that evening. Someone is hiding a secret.",        
        location: "The Grand Crescent Hotel",
        difficulty: "Medium",
        status: "unsolved",
        solution: "michael",
        notes: "",

        suspects: [
            {
                id: "michael",
                name: "Michael Turner",
                role: "Hotel Manager",
                description: "Michael has managed the hotel for eight years. He knows every room, service entrance, and security procedure.",
                statement: "I was in my office checking the reservations. I never entered Room 13.",
                motive: "Richard had discovered that Michael was stealing money from the hotel.",
                investigated: false
            },
            {
                id: "sarah",
                name: "Sarah Collins",
                role: "Hotel Receptionist",
                description: "Sarah was working at the front desk during the evening. She was responsible for giving guests their room keys.",
                statement: "I gave Richard his key at 8 PM. I didn't see him again.",
                motive: "Richard had threatened to reveal a personal secret that could cost her job.",
                investigated: false
            },
            {
                id: "james",
                name: "James Wilson",
                role: "Business Partner",
                description: "James had arrived at the hotel to meet Richard about an important business agreement.",
                statement: "We argued earlier, but I left the hotel before midnight.",
                motive: "Richard was planning to cancel their partnership and keep all the profits.",
                investigated: false
            },
            {
                id: "olivia",
                name: "Olivia Brooks",
                role: "Hotel Guest",
                description: "Olivia was staying in Room 14, directly opposite Richard's room.",
                statement: "I heard a loud noise around 11 PM, but I stayed inside my room.",
                motive: "Richard had accused her of taking an expensive necklace.",
                investigated: false
            },
            {
                id: "daniel",
                name: "Daniel Foster",
                role: "Night Security Guard",
                description: "Daniel was responsible for monitoring the hotel's security cameras and checking the corridors.",
                statement: "I checked the third floor at 10 PM. Everything seemed normal.",
                motive: "Richard had reported Daniel for sleeping during his night shifts.",
                investigated: false
            }
        ],

        evidence: [
            {
                id: "room-key",
                title: "The Duplicate Room Key",
                description: "A duplicate key for Room 13 was found inside the manager's office. Only the hotel manager could authorize its creation.",
                discovered: false
            },
            {
                id: "broken-glass",
                title: "Broken Glass",
                description: "A broken drinking glass was found beside Richard's bed. A chemical smell suggests something may have been added to his drink.",
                discovered: false
            },
            {
                id: "security-log",
                title: "Security Log",
                description: "The security system shows that the cameras on the third floor were disabled for twelve minutes. The shutdown was authorized using the manager's access code.",
                discovered: false
            },
            {
                id: "missing-letter",
                title: "A Torn Letter",
                description: "A torn piece of paper was found in a wastebasket. It mentions missing hotel funds and an investigation into financial theft.",
                discovered: false
            },
            {
                id: "muddy-shoes",
                title: "Muddy Shoe Prints",
                description: "Shoe prints were found near the emergency staircase. Their pattern matches the shoes worn by Michael, who claimed he never left his office.",
                discovered: false
            }
        ]
    },


    {
        id: 6,
        title: "Murder on the Yacht",
        description: "A wealthy businessman is found dead aboard his yacht during a storm. Five people were on board, and each had a reason to kill him. Only one is guilty.",
        location: "The Silver Horizon Yacht",
        difficulty: "Hard",
        status: "unsolved",
        solution: "nathan",
        notes: "",

        suspects: [
            {
                id: "nathan",
                name: "Nathan Cole",
                role: "Yacht Captain",
                description: "Nathan has commanded the Silver Horizon for six years. He controls the navigation system and has access to every part of the yacht.",
                statement: "I was on the bridge monitoring the storm. I never went near Richard's cabin.",
                motive: "Richard had discovered that Nathan was secretly using the yacht for illegal business activities and planned to dismiss him.",
                investigated: false
            },
            {
                id: "victoria",
                name: "Victoria Sterling",
                role: "Businesswoman",
                description: "Victoria is Richard's business partner. They had a serious argument shortly before dinner.",
                statement: "We disagreed about money, but I went to my room after dinner.",
                motive: "Richard planned to remove her from their company and take control of her shares.",
                investigated: false
            },
            {
                id: "henry",
                name: "Henry Brooks",
                role: "Personal Chef",
                description: "Henry prepared dinner for everyone aboard the yacht. He was responsible for serving Richard's final meal.",
                statement: "I was cleaning the kitchen when the storm became worse. I didn't leave the kitchen.",
                motive: "Richard had refused to pay Henry for several months of private catering work.",
                investigated: false
            },
            {
                id: "sophie",
                name: "Sophie Miller",
                role: "Family Friend",
                description: "Sophie had known Richard for many years. She was invited on the trip as a personal guest.",
                statement: "I was on the upper deck watching the storm. I heard nothing unusual.",
                motive: "Richard was threatening to reveal a secret about her past.",
                investigated: false
            },
            {
                id: "marcus",
                name: "Marcus Reed",
                role: "First Officer",
                description: "Marcus assists the captain and knows how to operate the yacht's navigation and communication systems.",
                statement: "I was checking the engine room. The storm caused several technical problems.",
                motive: "Richard had promised Marcus a promotion but recently gave the position to someone else.",
                investigated: false
            }
        ],

        evidence: [
            {
                id: "navigation-log",
                title: "The Navigation Log",
                description: "The navigation system shows that the yacht changed direction for several minutes around the estimated time of death. The change was made using the captain's control panel.",
                discovered: false
            },
            {
                id: "wet-footprints",
                title: "Wet Footprints",
                description: "Wet footprints lead from the bridge toward Richard's cabin. They are unusually narrow and match the size of Nathan's sailing boots.",
                discovered: false
            },
            {
                id: "broken-compass",
                title: "The Broken Compass",
                description: "A broken compass was found inside Richard's cabin. Its glass is cracked, and a small piece is missing. A matching piece was found near the captain's chair.",
                discovered: false
            },
            {
                id: "radio-recording",
                title: "The Radio Recording",
                description: "A saved radio transmission captures Nathan saying he was alone on the bridge. However, background sounds reveal that the navigation controls were being operated by someone else at that moment.",
                discovered: false
            },
            {
                id: "captain-journal",
                title: "The Captain's Journal",
                description: "A hidden journal in Nathan's cabin contains notes about Richard's plans to dismiss him. One entry, written on the night of the murder, reads: 'Tonight everything changes.'",
                discovered: false
            }
        ]
    },


    {
        id: 7,
        title: "The Ancient Artifact",
        description: "A priceless golden artifact disappears from a locked museum display case. Five people had access to the exhibition hall. Someone planned the theft carefully.",
        location: "The National History Museum",
        difficulty: "Medium",
        status: "unsolved",
        solution: "isabella",
        notes: "",

        suspects: [
            {
                id: "isabella",
                name: "Isabella Moore",
                role: "Museum Curator",
                description: "Isabella has worked at the museum for ten years. She supervised the artifact's arrival and was responsible for preparing its exhibition.",
                statement: "I checked the display case before leaving. The artifact was still there.",
                motive: "She secretly sold information about the artifact to a private collector and planned to steal it before the exhibition.",
                investigated: false
            },
            {
                id: "henry",
                name: "Henry Collins",
                role: "Security Guard",
                description: "Henry was assigned to protect the exhibition hall on the night of the disappearance.",
                statement: "I watched the cameras all evening. Nobody entered the exhibition hall.",
                motive: "He was facing financial problems and had recently received an expensive offer from an unknown buyer.",
                investigated: false
            },
            {
                id: "sophie",
                name: "Sophie Turner",
                role: "Restoration Specialist",
                description: "Sophie helped examine and restore the artifact before the exhibition.",
                statement: "I finished my work in the afternoon. I had no reason to return.",
                motive: "She believed the museum had taken credit for her restoration work and wanted revenge.",
                investigated: false
            },
            {
                id: "oliver",
                name: "Oliver Grant",
                role: "Private Collector",
                description: "Oliver is a wealthy collector who had previously tried to purchase the Eye of Ra.",
                statement: "I was invited to the exhibition, but I never touched the artifact.",
                motive: "He had offered millions for the artifact and was angry when the museum rejected his offer.",
                investigated: false
            },
            {
                id: "emma",
                name: "Emma Wilson",
                role: "Museum Researcher",
                description: "Emma was studying the history of the artifact and had access to the museum's research archives.",
                statement: "I spent the evening reading documents in the archive room.",
                motive: "She believed the artifact belonged to her family's ancestors and wanted to take it back.",
                investigated: false
            }
        ],

        evidence: [
            {
                id: "display-case",
                title: "The Display Case",
                description: "The display case shows no signs of forced entry. However, its electronic lock was opened using an authorized curator access code.",
                discovered: false
            },
            {
                id: "golden-dust",
                title: "Golden Dust",
                description: "Tiny particles of gold were discovered on the floor near the curator's office. They match the material used in the Eye of Ra.",
                discovered: false
            },
            {
                id: "security-footage",
                title: "Security Footage",
                description: "The cameras show that the exhibition hall's security feed was paused for exactly seven minutes. The command came from the curator's office.",
                discovered: false
            },
            {
                id: "shipping-document",
                title: "A Suspicious Shipping Document",
                description: "A shipping document was found in the archive. It describes a package leaving the museum on the night of the theft, addressed to a private company connected to Isabella.",
                discovered: false
            },
            {
                id: "hidden-replica",
                title: "The Hidden Replica",
                description: "A replica of the Eye of Ra was discovered inside a storage cabinet. It was made using the museum's original measurements, which only Isabella had approved.",
                discovered: false
            }
        ]
    },


    {
        id: 8,
        title: "The Frozen Alibi",
        description: "A wealthy businessman is found dead in an isolated mountain lodge during a snowstorm. Five guests were inside, and one of them is lying about their alibi.",
        location: "Blackstone Mountain Lodge",
        difficulty: "Hard",
        status: "unsolved",
        solution: "elizabeth",
        notes: "",

        suspects: [
            {
                id: "elizabeth",
                name: "Elizabeth Ward",
                role: "Lodge Owner",
                description: "Elizabeth owns Blackstone Mountain Lodge and knows every room, corridor, and service entrance in the building.",
                statement: "I was in my office reviewing the lodge accounts. I didn't leave until the morning.",
                motive: "Charles had discovered that Elizabeth was planning to sell the lodge illegally and intended to expose her.",
                investigated: false
            },
            {
                id: "robert",
                name: "Robert Hayes",
                role: "Mountain Guide",
                description: "Robert had guided Charles on several mountain expeditions. He was responsible for checking the outdoor equipment.",
                statement: "I was repairing equipment in the storage room when the storm started.",
                motive: "Charles blamed Robert for a previous accident that damaged his reputation and career.",
                investigated: false
            },
            {
                id: "margaret",
                name: "Margaret Lewis",
                role: "Doctor",
                description: "Margaret was a guest at the lodge and had treated Charles for a minor injury earlier that evening.",
                statement: "I was reading in the lounge. I heard nothing unusual.",
                motive: "Charles had refused to pay a large medical bill and threatened to report her professional conduct.",
                investigated: false
            },
            {
                id: "andrew",
                name: "Andrew Scott",
                role: "Business Associate",
                description: "Andrew had travelled with Charles to discuss a major investment. Their meeting ended in a heated argument.",
                statement: "I was in my bedroom making a phone call. I never entered Charles's room.",
                motive: "Charles planned to cancel their investment agreement and leave Andrew with enormous debts.",
                investigated: false
            },
            {
                id: "sophia",
                name: "Sophia Reed",
                role: "Lodge Receptionist",
                description: "Sophia was responsible for checking guests in and managing the lodge's room keys.",
                statement: "I was at the reception desk all evening. Nobody asked me for a key.",
                motive: "Charles had discovered that Sophia was secretly stealing money from guest payments.",
                investigated: false
            }
        ],

        evidence: [
            {
                id: "fireplace-ashes",
                title: "The Fireplace Ashes",
                description: "Fresh ashes were discovered inside Charles's fireplace. A partially burned document contains Elizabeth's name and details about the planned sale of the lodge.",
                discovered: false
            },
            {
                id: "frozen-window",
                title: "The Frozen Window",
                description: "Charles's bedroom window was frozen shut from the outside. However, a small scratch near the lock suggests someone had opened it before the temperature dropped.",
                discovered: false
            },
            {
                id: "missing-master-key",
                title: "The Missing Master Key",
                description: "The lodge's master key was missing from the owner's office. Elizabeth claimed she had locked it away before dinner, but there was no sign of forced entry.",
                discovered: false
            },
            {
                id: "snow-footprints",
                title: "The Snow Footprints",
                description: "A set of footprints was discovered outside Charles's window. They lead toward the owner's private entrance rather than the main entrance.",
                discovered: false
            },
            {
                id: "false-alibi",
                title: "The False Alibi",
                description: "The lodge's heating records show that the temperature in Elizabeth's office dropped suddenly for twenty minutes. This contradicts her claim that she stayed there beside the fireplace all evening.",
                discovered: false
            }
        ]
    },


    {
        id: 9,
        title: "The Lighthouse Disappearance",
        description: "A lighthouse keeper mysteriously disappears during a storm. His belongings remain behind, and five people were seen near the lighthouse that evening. One of them knows the truth.",
        location: "Blackwater Lighthouse",
        difficulty: "Medium",
        status: "unsolved",
        solution: "patrick",
        notes: "",

        suspects: [
            {
                id: "patrick",
                name: "Patrick Moore",
                role: "Lighthouse Assistant",
                description: "Patrick worked alongside Samuel and helped maintain the lighthouse equipment. He knew the building better than anyone.",
                statement: "I left before the storm became dangerous. Samuel was perfectly fine when I saw him.",
                motive: "Samuel had discovered that Patrick was secretly selling valuable equipment belonging to the lighthouse.",
                investigated: false
            },
            {
                id: "laura",
                name: "Laura Bennett",
                role: "Local Journalist",
                description: "Laura was investigating strange lights reported by fishermen near the coastline.",
                statement: "I was taking photographs from the nearby cliffs. I never entered the lighthouse.",
                motive: "Samuel had refused to give her information that could have made her investigation famous.",
                investigated: false
            },
            {
                id: "george",
                name: "George Wilson",
                role: "Fisherman",
                description: "George regularly sailed near the lighthouse and knew Samuel personally.",
                statement: "I was repairing my boat at the harbour during the storm.",
                motive: "Samuel had reported George for illegal fishing activities.",
                investigated: false
            },
            {
                id: "emily",
                name: "Emily Carter",
                role: "Samuel's Daughter",
                description: "Emily arrived at the lighthouse earlier that evening after a long disagreement with her father.",
                statement: "I left after our argument. I didn't return.",
                motive: "She believed Samuel was hiding important family documents that belonged to her.",
                investigated: false
            },
            {
                id: "richard",
                name: "Richard Hayes",
                role: "Coast Guard Officer",
                description: "Richard was responsible for monitoring the coastline and responding to emergencies.",
                statement: "I was monitoring the coastal radio signals all evening.",
                motive: "Samuel had discovered that Richard was falsifying official rescue reports.",
                investigated: false
            }
        ],

        evidence: [
            {
                id: "broken-radio",
                title: "The Broken Radio",
                description: "The lighthouse radio was damaged shortly before Samuel disappeared. Someone deliberately cut its power connection.",
                discovered: false
            },
            {
                id: "muddy-boots",
                title: "Muddy Boot Prints",
                description: "A trail of muddy footprints leads from the lighthouse equipment room to a hidden maintenance entrance. The prints match Patrick's work boots.",
                discovered: false
            },
            {
                id: "maintenance-key",
                title: "The Missing Maintenance Key",
                description: "The key to the underground maintenance tunnel is missing. Records show that Patrick borrowed it earlier that evening.",
                discovered: false
            },
            {
                id: "hidden-bag",
                title: "The Hidden Equipment Bag",
                description: "A bag containing stolen lighthouse equipment was discovered near the maintenance tunnel. A receipt inside carries Patrick's signature.",
                discovered: false
            },
            {
                id: "false-report",
                title: "The False Departure Report",
                description: "Patrick claimed he left the lighthouse before the storm. However, the lighthouse maintenance log shows that someone used his access code almost an hour later.",
                discovered: false
            }
        ]
    },

    {
        id: 10,
        title: "The Missing Trophy",
        description: "The school's championship trophy disappears before the awards ceremony. Five people had access to the hall, but nobody admits taking it. Can you find the thief?",
        location: "Westbrook High School",
        difficulty: "Easy",
        status: "unsolved",
        solution: "luke",
        notes: "",

        suspects: [
            {
                id: "luke",
                name: "Luke Parker",
                role: "School Team Captain",
                description: "Luke led the school team to victory last year. He was responsible for returning the trophy after the last practice.",
                statement: "I put the trophy back in the cabinet. I didn't touch it afterward.",
                motive: "Luke wanted to keep the trophy because he believed the team deserved to own it permanently.",
                investigated: false
            },
            {
                id: "amy",
                name: "Amy Wilson",
                role: "Student Photographer",
                description: "Amy was taking pictures around the school hall for the upcoming ceremony.",
                statement: "I took pictures near the cabinet, but I never opened it.",
                motive: "She wanted an exclusive photograph of the trophy for the school magazine.",
                investigated: false
            },
            {
                id: "peter",
                name: "Peter Adams",
                role: "Janitor",
                description: "Peter cleaned the school hall every evening and had access to the storage rooms.",
                statement: "I cleaned the floor and left before closing time.",
                motive: "He was angry because the school refused to reward him for helping organize the previous championship.",
                investigated: false
            },
            {
                id: "sophie",
                name: "Sophie Clark",
                role: "School Secretary",
                description: "Sophie organized the awards ceremony and had a spare key to the display cabinet.",
                statement: "I checked the ceremony arrangements, but everything was normal.",
                motive: "She wanted to embarrass the school principal after a disagreement.",
                investigated: false
            },
            {
                id: "mark",
                name: "Mark Evans",
                role: "Assistant Coach",
                description: "Mark helped train the school team and had access to the sports equipment room.",
                statement: "I was preparing equipment for the next practice.",
                motive: "He believed the team captain received too much credit for the victory.",
                investigated: false
            }
        ],

        evidence: [
            {
                id: "cabinet-key",
                title: "The Cabinet Key",
                description: "A small key was found near the display cabinet. Its label shows that it belongs to the school team captain.",
                discovered: false
            },
            {
                id: "shoe-prints",
                title: "Shoe Prints",
                description: "Dusty shoe prints lead from the trophy cabinet toward the sports equipment room. Their size matches Luke's shoes.",
                discovered: false
            },
            {
                id: "team-photo",
                title: "The Team Photograph",
                description: "A photograph taken after the championship shows Luke holding the trophy. In the background, he is carrying a large sports bag.",
                discovered: false
            },
            {
                id: "locker-note",
                title: "The Hidden Note",
                description: "A note found inside Luke's locker says: 'The trophy should stay with us.'",
                discovered: false
            },
            {
                id: "camera-footage",
                title: "Camera Footage",
                description: "The hallway camera shows Luke entering the school hall shortly after everyone else had left.",
                discovered: false
            }
        ]
    },


    {
        id: 11,
        title: "The Vanishing Backpack",
        description: "A student's backpack containing important documents and a tablet disappears during lunch break. Five people entered the classroom. Who took it?",
        location: "Greenwood Academy",
        difficulty: "Easy",
        status: "unsolved",
        solution: "noah",
        notes: "",

        suspects: [
            {
                id: "noah",
                name: "Noah Williams",
                role: "Classmate",
                description: "Noah sits next to the owner of the missing backpack and was seen near the classroom during lunch.",
                statement: "I only went inside to collect my notebook.",
                motive: "He wanted to borrow the expensive tablet but was afraid the owner would refuse.",
                investigated: false
            },
            {
                id: "mia",
                name: "Mia Johnson",
                role: "Class Representative",
                description: "Mia was responsible for collecting homework and organizing classroom activities.",
                statement: "I was collecting assignments during lunch.",
                motive: "She was angry because the backpack's owner had blamed her for losing some school documents.",
                investigated: false
            },
            {
                id: "liam",
                name: "Liam Brown",
                role: "Sports Team Member",
                description: "Liam returned to the classroom after football practice to collect his water bottle.",
                statement: "I didn't even notice a backpack.",
                motive: "He wanted the tablet to play games with his friends.",
                investigated: false
            },
            {
                id: "emma",
                name: "Emma Davis",
                role: "Best Friend",
                description: "Emma was helping decorate the classroom for an upcoming school event.",
                statement: "I stayed near the windows the entire time.",
                motive: "She wanted to hide the backpack as a prank.",
                investigated: false
            },
            {
                id: "jack",
                name: "Jack Miller",
                role: "School Assistant",
                description: "Jack helped teachers prepare classrooms and had access to the storage room.",
                statement: "I entered the classroom to move some chairs.",
                motive: "He believed the backpack contained money that belonged to him.",
                investigated: false
            }
        ],

        evidence: [
            {
                id: "blue-thread",
                title: "A Blue Thread",
                description: "A blue thread was found caught on the classroom door handle. It matches the jacket Noah was wearing that day.",
                discovered: false
            },
            {
                id: "empty-desk",
                title: "The Empty Desk",
                description: "A witness remembers seeing Noah standing beside the missing backpack's desk shortly before lunch ended.",
                discovered: false
            },
            {
                id: "hallway-camera",
                title: "Hallway Camera",
                description: "The hallway camera shows Noah leaving the classroom carrying a large bag, although he claimed he only had his notebook.",
                discovered: false
            },
            {
                id: "locker-note",
                title: "A Hidden Note",
                description: "A note found inside Noah's locker reads: 'I need that tablet before tomorrow.'",
                discovered: false
            },
            {
                id: "storage-key",
                title: "The Storage Room Key",
                description: "A key to the storage room was found in Noah's schoolbag. The missing backpack was later spotted behind some boxes in that room.",
                discovered: false
            }
        ]
    },
    
    {
        id: 12,
        title: "The Clockmaker's Secret",
        description: "A famous clockmaker is found dead in his locked workshop, and his most valuable creation has disappeared. Five people visited him that evening. Can you solve the mystery using the timeline?",
        location: "Whitmore's Clock Workshop",
        difficulty: "Hard",
        status: "unsolved",
        solution: "victoria",
        notes: "",

        suspects: [
            {
                id: "victoria",
                name: "Victoria Hale",
                role: "Apprentice Clockmaker",
                description: "Victoria worked with Arthur for six years and knew how every mechanism in his workshop operated. She was the last person officially recorded as visiting him.",
                statement: "I left at 10 PM. Arthur was alive and working on his newest clock when I departed.",
                motive: "Arthur had discovered that Victoria was secretly selling copies of his original designs and planned to report her.",
                investigated: false
            },
            {
                id: "edward",
                name: "Edward Brooks",
                role: "Antique Collector",
                description: "Edward had offered Arthur a fortune for the mechanical clock, but Arthur repeatedly refused to sell it.",
                statement: "I was at a restaurant across town. I never entered the workshop that evening.",
                motive: "He desperately wanted the clock because he believed its hidden compartment contained a valuable historical document.",
                investigated: false
            },
            {
                id: "margaret",
                name: "Margaret Whitmore",
                role: "Arthur's Sister",
                description: "Margaret visited the workshop regularly and knew about Arthur's family inheritance.",
                statement: "I called Arthur at 11 PM, but he didn't answer. I assumed he was busy.",
                motive: "She believed Arthur had unfairly kept their family's valuable collection for himself.",
                investigated: false
            },
            {
                id: "thomas",
                name: "Thomas Reed",
                role: "Workshop Assistant",
                description: "Thomas handled deliveries and maintained the workshop's tools. He had access to several restricted storage areas.",
                statement: "I was delivering a package to another customer. I returned home before midnight.",
                motive: "Arthur had discovered that Thomas was stealing expensive clock components.",
                investigated: false
            },
            {
                id: "elizabeth",
                name: "Elizabeth Carter",
                role: "Local Historian",
                description: "Elizabeth was researching the history of Arthur's family and had recently requested access to his private collection.",
                statement: "I was studying old documents at the public library that evening.",
                motive: "She believed Arthur possessed a historical document that could prove her family had a legal claim to the clock.",
                investigated: false
            }
        ],

        evidence: [
            {
                id: "stopped-clock",
                title: "The Stopped Clock",
                description: "The workshop clock stopped at 11:40 PM. However, its internal mechanism shows signs of deliberate interference. The clock may have been stopped earlier to create a false time of death.",
                discovered: false
            },
            {
                id: "hidden-blueprint",
                title: "The Hidden Blueprint",
                description: "A blueprint was discovered beneath Arthur's workbench. It shows a secret passage inside the workshop wall, accessible only by operating a special clock mechanism.",
                discovered: false
            },
            {
                id: "wax-impression",
                title: "The Wax Key Impression",
                description: "A wax impression of the workshop's private key was found inside a drawer. Its edges show that someone recently used it to create a duplicate.",
                discovered: false
            },
            {
                id: "burned-letter",
                title: "The Burned Letter",
                description: "A partially burned letter in the fireplace contains a warning from Arthur to Victoria. It mentions stolen designs and an upcoming meeting with the police.",
                discovered: false
            },
            {
                id: "mechanical-spring",
                title: "The Mechanical Spring",
                description: "A damaged spring was found inside the hidden clock mechanism. It matches a replacement part recently signed out by Victoria. The mechanism could have been used to open the secret passage and make the workshop appear locked from the inside.",
                discovered: false
            }
        ]
    }

];



function showPage(pageId) {

    pages.forEach(function(page) {
        page.classList.remove("active-page");
    });

    navButtons.forEach(function(button) {
        button.classList.remove("active");
    });

    const selectedPage = document.getElementById(pageId);
    selectedPage.classList.add("active-page");

    const selectedButton = document.querySelector(
        `[data-page="${pageId}"]`
    );

    selectedButton.classList.add("active");
}


function updateDashboard() {
    const totalCases = cases.length;

    const solvedCases = cases.filter(function(caseItem) {
        return caseItem.status === "solved";
    }).length;

    const unsolvedCases = totalCases - solvedCases;

    totalCasesElement.textContent = totalCases;
    solvedCasesElement.textContent = solvedCases;
    unsolvedCasesElement.textContent = unsolvedCases;

    const completionRate = totalCases === 0
        ? 0
        : Math.round((solvedCases / totalCases) * 100);

    completionRateElement.textContent = completionRate + "%";
    completionProgressFill.style.width = completionRate + "%";
}

function saveProgress() {
    localStorage.setItem("detectiveCases", JSON.stringify(cases));
}


function loadProgress() {
    const savedCases = localStorage.getItem("detectiveCases");

    if (!savedCases) return;

    try {
        const parsedCases = JSON.parse(savedCases);

        if (!Array.isArray(parsedCases)) return;

        cases.forEach(function(caseItem) {
            const savedCase = parsedCases.find(function(item) {
                return item.id === caseItem.id && item.title === caseItem.title;
            }) || parsedCases.find(function(item) {
                return item.title === caseItem.title;
            }) || parsedCases.find(function(item) {
                return item.id === caseItem.id;
            });

            if (!savedCase) return;

            if (savedCase.status === "solved" || savedCase.status === "unsolved") {
                caseItem.status = savedCase.status;
            }

            if (typeof savedCase.notes === "string") {
                caseItem.notes = savedCase.notes;
            }

            if (Array.isArray(savedCase.evidence)) {
                caseItem.evidence.forEach(function(clue) {
                    const savedEvidence = savedCase.evidence.find(function(savedClue) {
                        return savedClue.id === clue.id;
                    });

                    if (savedEvidence && typeof savedEvidence.discovered === "boolean") {
                        clue.discovered = savedEvidence.discovered;
                    }
                });
            }

            if (Array.isArray(savedCase.suspects)) {
                caseItem.suspects.forEach(function(suspect) {
                    const savedSuspect = savedCase.suspects.find(function(savedItem) {
                        return savedItem.id === suspect.id;
                    });

                    if (savedSuspect && typeof savedSuspect.investigated === "boolean") {
                        suspect.investigated = savedSuspect.investigated;
                    }
                });
            }
        });
    } catch (error) {
        console.error("Unable to load saved progress:", error);
    }
}


function displayCases(searchTerm = "") {
    casesContainer.innerHTML = "";

        const filteredCases = cases.filter(function(caseItem) {
            const matchesSearch =
                caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                caseItem.location.toLowerCase().includes(searchTerm.toLowerCase());

            const selectedDifficulty = difficultyFilter.value;

            const matchesDifficulty =
                selectedDifficulty === "all" ||
                caseItem.difficulty === selectedDifficulty;

            return matchesSearch && matchesDifficulty;
        });

    if (filteredCases.length === 0) {
        casesContainer.textContent = "No cases match your search.";
        return;
    }

        filteredCases.forEach(function(caseItem) {

        const caseCard = document.createElement("div");
        caseCard.classList.add("case-card");

        const caseTitle = document.createElement("h3");
        caseTitle.textContent = caseItem.title;

        const caseDescription = document.createElement("p");
        caseDescription.textContent = caseItem.description;

        const caseLocation = document.createElement("p");
        caseLocation.textContent = "📍 " + caseItem.location;

        const caseStatus = document.createElement("span");

        caseStatus.textContent = caseItem.status === "solved"
            ? "Solved"
            : "Unsolved";

        caseStatus.classList.add("case-status");

        if (caseItem.status === "solved") {
            caseStatus.classList.add("solved");
        } else {
            caseStatus.classList.add("unsolved");
        }

        const caseDifficulty = document.createElement("span");
        caseDifficulty.textContent = caseItem.difficulty;
        caseDifficulty.classList.add("difficulty-badge");

        const investigateButton = document.createElement("button");
        investigateButton.textContent = "View Details";
        investigateButton.classList.add("investigate-btn");

        investigateButton.addEventListener("click", function() {
            openCaseModal(caseItem.id);
        });

        caseCard.append(
            caseTitle,
            caseDescription,
            caseLocation,
            caseStatus,
            caseDifficulty,
            investigateButton
        );

        casesContainer.appendChild(caseCard);
    });
}

difficultyFilter.addEventListener("change", function() {
    displayCases(caseSearchInput.value);
});

clearFiltersButton.addEventListener("click", function() {
    caseSearchInput.value = "";
    difficultyFilter.value = "all";

    displayCases();
});

caseSearchInput.addEventListener("input", function() {
    displayCases(caseSearchInput.value);
});

closeModalButton.addEventListener("click", function() {
     caseModal.classList.remove("show");
});

modalInvestigateButton.addEventListener("click", function() {
    if (currentModalCaseId === null) return;

    caseModal.classList.remove("show");

    openCase(currentModalCaseId);
});

caseModal.addEventListener("click", function(event) {
    if (event.target === caseModal) {
        caseModal.classList.remove("show");
    }
});

resetModal.addEventListener("click", function(event) {
    if (event.target === resetModal) {
        resetModal.style.display = "none";
    }
});


function openCaseModal(caseId) {
    const selectedCase = cases.find(function(caseItem) {
        return caseItem.id === caseId;
    });

    if (!selectedCase) return;

    if (selectedCase.status === "solved") {
        showToast("This case has already been solved");
        return;
    }

    currentModalCaseId = selectedCase.id;

    modalCaseTitle.textContent = selectedCase.title;
    modalCaseDescription.textContent = selectedCase.description;
    modalCaseLocation.textContent = "Location: " + selectedCase.location;
    modalCaseDifficulty.textContent = "Difficulty: " + selectedCase.difficulty;

    if (selectedCase.status === "solved") {
        modalInvestigateButton.style.display = "none";
        modalSolvedMessage.style.display = "block";
    } else {
        modalInvestigateButton.style.display = "block";
        modalSolvedMessage.style.display = "none";
    }

    caseModal.classList.add("show");
}


function openCase(caseId) {

    currentCaseId = caseId;
    const selectedCase = cases.find(function(caseItem) {
        return caseItem.id === caseId;
    });

    if (!selectedCase) return;

    investigationContainer.innerHTML = `
        <div class="investigation-header">
            <button id="back-to-cases-btn" class="back-to-cases-btn">
                ← Back to Cases
            </button>

            <h2>${selectedCase.title}</h2>
            <p class="investigation-location">
                Location: ${selectedCase.location}
            </p>

            <p class="investigation-difficulty">
                Difficulty: ${selectedCase.difficulty}
            </p>

            <div class="investigation-details">
                <span>📍 ${selectedCase.location}</span>
                <span>Difficulty: ${selectedCase.difficulty}</span>
            </div>
        </div>

        <section class="progress-section">
            <div class="progress-heading">
                <h3>Investigation Progress</h3>
                <span id="evidence-count">0 / 0</span>
            </div>
            <div class="progress-bar">
                <div id="evidence-progress" class="progress-fill"></div>
            </div>
        </section>

        <section class="suspects-section">
            <h3>Suspects</h3>
            <p>Examine each suspect carefully. Someone is hiding something.</p>

            <div class="progress-heading">
                <h4>Suspect Investigation Progress</h4>
                <span id="suspect-count">0 / 0</span>
            </div>

            <div class="progress-bar">
                <div id="suspect-progress" class="progress-fill"></div>
            </div>

            <div id="suspects-container" class="suspects-container"></div>
        </section>

        <section class="evidence-section">
            <h3>Evidence Board</h3>
            <p>Examine the clues carefully. Every detail matters.</p>
            <div id="evidence-container" class="evidence-container"></div>
        </section>

        <section class="notes-section">
            <h3>Detective's Notebook</h3>
            <p>Write down your observations and important details.</p>
            <textarea
                id="investigation-notes"
                placeholder="Write your investigation notes here..."
            ></textarea>
            <button id="clear-notes-btn" class="clear-notes-btn">
                Clear notes
            </button>
            <p id="notes-counter">0 characters</p>
            <p id="notes-message"></p>
        </section>

        <div id="solved-message" class="solved-case-banner" style="display: none;">
            <h3>Case Successfully Solved</h3>
            <p>Excellent detective work, the mystery has been solved</p>
        </div>

        <section class="accusation-section">
            <h3>Make Your Accusation</h3>
            <p>Have you gathered enough evidence? Choose the person you believe is guilty.</p>

            <p id="evidence-requirement-message">
                Discover at least 3 pieces of evidence before making an accusation.
            </p>

            <div id="accusation-content">
                <select id="suspect-select">
                    <option value="">Choose a suspect...</option>
                </select>

                <button id="accuse-btn" class="accuse-btn">
                    Accuse Suspect
                </button>
            </div>

            <p id="accusation-message"></p>
        </section>
    `;

    showPage("investigation-page");

    document.getElementById("back-to-cases-btn")
        .addEventListener("click", function() {
            showPage("cases-page");
        });

    displaySuspects(selectedCase.suspects);
    displayEvidence(selectedCase.evidence);
    updateEvidenceProgress(selectedCase.evidence);

    const notesInput = document.getElementById("investigation-notes");
    const notesMessage = document.getElementById("notes-message");
    const notesCounter = document.getElementById("notes-counter");
    const clearNotesButton = document.getElementById("clear-notes-btn");

    clearNotesButton.addEventListener("click", function() {
        clearNotesModal.style.display = "flex";
    });

    notesInput.value = selectedCase.notes || "";
    clearNotesButton.disabled = notesInput.value.trim().length === 0;
    notesCounter.textContent = notesInput.value.length + " characters";

    notesInput.addEventListener("input", function() {
        selectedCase.notes = notesInput.value;

        saveProgress();

        notesCounter.textContent =
            notesInput.value.length + " characters";
        clearNotesButton.disabled = notesInput.value.trim().length === 0;

        notesMessage.textContent = "Notes saved automatically";
    });

    const suspectSelect = document.getElementById("suspect-select");

    selectedCase.suspects.forEach(function(suspect) {
        const option = document.createElement("option");
        option.value = suspect.id;
        option.textContent = suspect.name;
        suspectSelect.appendChild(option);
    });

    const accuseButton = document.getElementById("accuse-btn");
    const accusationContent = document.getElementById("accusation-content");
    const accusationMessage = document.getElementById("accusation-message");

    const evidenceRequirementMessage = document.getElementById(
        "evidence-requirement-message"
    );

    const discoveredEvidenceCount = selectedCase.evidence.filter(function(clue) {
        return clue.discovered;
    }).length;

    const hasEnoughEvidence = discoveredEvidenceCount >= 3;

    accuseButton.disabled = !hasEnoughEvidence;

    evidenceRequirementMessage.style.display =
        hasEnoughEvidence ? "none" : "block";

    if (selectedCase.status === "solved") {

        document.getElementById("accusation-content").style.display = "none";
        document.getElementById("solved-message").style.display = "block";
        accusationContent.style.display = "none";
        accusationMessage.textContent =
            "This case has already been solved, excellent detective work";
        accusationMessage.style.color = "var(--success)";
    } else {
        accuseButton.addEventListener("click", function() {
            const accusedSuspect = suspectSelect.value;

            if (accusedSuspect === "") {
                accusationMessage.textContent =
                    "Please choose a suspect first";
                accusationMessage.style.color = "var(--danger)";
                return;
            }

            currentAccusedSuspect = accusedSuspect;

            const selectedSuspect = selectedCase.suspects.find(function(suspect) {
                return suspect.id === accusedSuspect;
            });

            accusationModalMessage.textContent =
                "Are you sure you want to accuse " + selectedSuspect.name + "?";

            accusationModal.style.display = "flex";
        });
    }
}

cancelClearNotesButton.addEventListener("click", function() {
    clearNotesModal.style.display = "none";
});

confirmClearNotesButton.addEventListener("click", function() {
    if (!currentCaseId) return;

    const selectedCase = cases.find(function(caseItem) {
        return caseItem.id === currentCaseId;
    });

    if (!selectedCase) return;

    selectedCase.notes = "";

    document.getElementById("investigation-notes").value = "";
    document.getElementById("clear-notes-btn").disabled = true;
    document.getElementById("notes-counter").textContent = "0 characters";

    saveProgress();

    clearNotesModal.style.display = "none";

    showToast("Investigation notes cleared!");
});

clearNotesModal.addEventListener("click", function(event) {
    if (event.target === clearNotesModal) {
        clearNotesModal.style.display = "none";
    }
});


function displaySuspects(suspects) {
    const suspectsContainer = document.getElementById("suspects-container");

    suspectsContainer.innerHTML = "";

    if (suspects.length === 0) {
        suspectsContainer.textContent = "Suspect information is not available yet.";
        return;
    }

    suspects.forEach(function(suspect) {
        const suspectCard = document.createElement("div");
        suspectCard.classList.add("suspect-card");

        const suspectName = document.createElement("h4");
        suspectName.textContent = suspect.name;

        const suspectRole = document.createElement("span");
        suspectRole.textContent = suspect.role;
        suspectRole.classList.add("suspect-role");

        const suspectStatus = document.createElement("span");

       if (suspect.investigated) {
            suspectStatus.textContent = "Investigated";
            suspectStatus.classList.add("suspect-investigated");
        } else {
            suspectStatus.textContent = "Not Investigated";
            suspectStatus.classList.add("suspect-not-investigated");
        }

        const suspectDescription = document.createElement("p");
        suspectDescription.textContent = suspect.description;

        const suspectStatement = document.createElement("p");
        suspectStatement.textContent = `"${suspect.statement}"`;

        const suspectMotive = document.createElement("p");
        suspectMotive.textContent = "Possible motive: " + suspect.motive;

        const investigateButton = document.createElement("button");

        investigateButton.classList.add("investigate-suspect-btn");

        if (suspect.investigated) {
            investigateButton.textContent = "Investigated";
            investigateButton.disabled = true;
        } else {
            investigateButton.textContent = "Mark as Investigated";
        }

        investigateButton.addEventListener("click", function() {
            suspect.investigated = true;

            saveProgress();

            displaySuspects(suspects);

            showToast(suspect.name + " marked as investigated!");
        });

        suspectCard.append(
            suspectName,
            suspectRole,
            suspectStatus,
            suspectDescription,
            suspectStatement,
            suspectMotive,
            investigateButton
        );

        suspectsContainer.appendChild(suspectCard);
    });

    updateSuspectProgress(suspects);
}

function updateSuspectProgress(suspects) {
    const suspectCount = document.getElementById("suspect-count");
    const suspectProgress = document.getElementById("suspect-progress");

    const totalSuspects = suspects.length;

    const investigatedSuspects = suspects.filter(function(suspect) {
        return suspect.investigated;
    }).length;

    const percentage = totalSuspects === 0
        ? 0
        : (investigatedSuspects / totalSuspects) * 100;

    suspectCount.textContent =
        investigatedSuspects + " / " + totalSuspects;

    suspectProgress.style.width = percentage + "%";
}

function displayEvidence(evidence) {
    const evidenceContainer = document.getElementById("evidence-container");

    evidenceContainer.innerHTML = "";

    if (evidence.length === 0) {
        evidenceContainer.textContent = "No evidence is available yet.";
        return;
    }

    evidence.forEach(function(clue) {
        const evidenceCard = document.createElement("div");
        evidenceCard.classList.add("evidence-card");

        if (clue.discovered) {
            evidenceCard.classList.add("discovered");
        } else {
            evidenceCard.classList.add("undiscovered");
        }

        const evidenceTitle = document.createElement("h4");
        evidenceTitle.textContent = "🔎 " + clue.title;

        const evidenceDescription = document.createElement("p");
        evidenceDescription.textContent = clue.description;

        const evidenceStatus = document.createElement("span");

        evidenceStatus.textContent = clue.discovered
        ? "✓ Evidence Discovered"
        : "🔒 Not Discovered";

        evidenceStatus.classList.add("evidence-status");

        const discoverButton = document.createElement("button");
        discoverButton.classList.add("discover-btn");

        if (clue.discovered) {
            discoverButton.textContent = "Already Discovered";
            discoverButton.disabled = true;
        } else {
            discoverButton.textContent = "Discover Evidence";

            discoverButton.addEventListener("click", function() {
                discoverEvidence(clue.id);
            });
        }

        evidenceCard.append(
            evidenceTitle,
            evidenceDescription,
            evidenceStatus,
            discoverButton
        );

        evidenceContainer.appendChild(evidenceCard);
    });
}

function updateEvidenceProgress(evidence) {
    const evidenceCount = document.getElementById("evidence-count");
    const evidenceProgress = document.getElementById("evidence-progress");

    const totalEvidence = evidence.length;

    const discoveredEvidence = evidence.filter(function(clue) {
        return clue.discovered;
    }).length;

    const percentage = totalEvidence === 0
        ? 0
        : (discoveredEvidence / totalEvidence) * 100;

    evidenceCount.textContent = `${discoveredEvidence} / ${totalEvidence}`;

    evidenceProgress.style.width = percentage + "%";
}

function discoverEvidence(evidenceId) {
    const selectedCase = cases.find(function(caseItem) {
        return caseItem.id === currentCaseId;
    });

    if (!selectedCase) return;

    const selectedEvidence = selectedCase.evidence.find(function(clue) {
        return clue.id === evidenceId;
    });

    if (!selectedEvidence || selectedEvidence.discovered) return;

    currentEvidenceId = evidenceId;
    evidenceModalTitle.textContent = selectedEvidence.title;
    evidenceModalDescription.textContent =
        "Are you sure you want to discover " + selectedEvidence.title + "?";
    evidenceModal.style.display = "flex";
}

cancelEvidenceButton.addEventListener("click", function() {
    evidenceModal.style.display = "none";
    currentEvidenceId = null;
});

confirmEvidenceButton.addEventListener("click", function() {
    const selectedCase = cases.find(function(caseItem) {
        return caseItem.id === currentCaseId;
    });

    if (!selectedCase) {
        evidenceModal.style.display = "none";
        currentEvidenceId = null;
        return;
    }

    const selectedEvidence = selectedCase.evidence.find(function(clue) {
        return clue.id === currentEvidenceId;
    });

    if (!selectedEvidence || selectedEvidence.discovered) {
        evidenceModal.style.display = "none";
        currentEvidenceId = null;
        return;
    }

    selectedEvidence.discovered = true;

    saveProgress();

    displayEvidence(selectedCase.evidence);
    updateEvidenceProgress(selectedCase.evidence);

    const discoveredEvidenceCount = selectedCase.evidence.filter(function(clue) {
        return clue.discovered;
    }).length;

    const hasEnoughEvidence = discoveredEvidenceCount >= 3;

    const accuseButton = document.getElementById("accuse-btn");
    const evidenceRequirementMessage = document.getElementById(
        "evidence-requirement-message"
    );

    if (accuseButton && evidenceRequirementMessage) {
        accuseButton.disabled = !hasEnoughEvidence;

        evidenceRequirementMessage.style.display =
            hasEnoughEvidence ? "none" : "block";
    }

    evidenceModal.style.display = "none";
    currentEvidenceId = null;

    showToast("Evidence discovered successfully!");
});

evidenceModal.addEventListener("click", function(event) {
    if (event.target === evidenceModal) {
        evidenceModal.style.display = "none";
        currentEvidenceId = null;
    }
});

function resetProgress() {
    cases.forEach(function(caseItem) {
        caseItem.status = "unsolved";
        caseItem.notes = "";

        caseItem.evidence.forEach(function(clue) {
            clue.discovered = false;
        });

        caseItem.suspects.forEach(function(suspect) {
            suspect.investigated = false;
        });
    });

    saveProgress();

    displayCases(caseSearchInput.value);
    updateDashboard();

    showPage("cases-page");

    showToast("Your progress has been successfully reset");
}

function showToast(message) {
    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimeout);

    toastTimeout = setTimeout(function() {
        toast.classList.remove("show");
    }, 3000);
}

resetProgressButton.addEventListener("click", function() {
    resetModal.style.display = "flex";
});

cancelResetButton.addEventListener("click", function() {
    resetModal.style.display = "none";
});

confirmResetButton.addEventListener("click", function() {
    resetModal.style.display = "none";
    resetProgress();
});

navButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const pageId = button.dataset.page;
        showPage(pageId);
    });
});

cancelAccusationButton.addEventListener("click", function() {
    accusationModal.style.display = "none";
    currentAccusedSuspect = null;
});

accusationModal.addEventListener("click", function(event) {
    if (event.target === accusationModal) {
        accusationModal.style.display = "none";
        currentAccusedSuspect = null;
    }
});

confirmAccusationButton.addEventListener("click", function() {
    if (!currentAccusedSuspect) return;

    const selectedCase = cases.find(function(caseItem) {
        return caseItem.id === currentCaseId;
    });

    if (!selectedCase || selectedCase.status === "solved") {
        accusationModal.style.display = "none";
        currentAccusedSuspect = null;
        return;
    }

    // Get the dynamically created elements
    const accusationContent = document.getElementById("accusation-content");
    const accusationMessage = document.getElementById("accusation-message");

    if (currentAccusedSuspect === selectedCase.solution) {
        selectedCase.status = "solved";

        saveProgress();
        updateDashboard();
        displayCases(caseSearchInput.value);

        accusationContent.style.display = "none";

        accusationMessage.textContent =
            "Congratulations! You found the culprit!";
        accusationMessage.style.color = "var(--success)";

        showToast("Case solved! Excellent detective work!");
    } else {
        accusationMessage.textContent =
            "Wrong accusation! The real culprit is still out there.";
        accusationMessage.style.color = "var(--danger)";
    }

    accusationModal.style.display = "none";
    currentAccusedSuspect = null;
});

loadProgress();
displayCases(caseSearchInput.value);
updateDashboard();
