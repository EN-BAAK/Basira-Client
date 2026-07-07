import {
  FaShirt,
  FaScissors,
  FaRuler,
  FaPalette,
  FaPaintbrush,
  FaGem,
  FaStar,
  FaAward,
  FaCrown,
  FaGift,
  FaTags,
  FaBoxOpen,
  FaTruck,
  FaWarehouse,
  FaCartShopping,
  FaBagShopping,
  FaShop,
  FaStore,
  FaPersonDress,
  FaUserTie,
  FaUsers,
  FaHeart,
  FaCheck,
  FaShield,
  FaLeaf,
  FaRecycle,
  FaMagnifyingGlass,
  FaPercent,
  FaCertificate,
  FaClock,
  FaPhone,
  FaEnvelope,
  FaComments,
  FaInstagram,
  FaGlobe,
} from "react-icons/fa6";

export const FEATURE_ICONS = [
  "shirt",
  "scissors",
  "ruler",

  "thread",
  "palette",
  "paintbrush",

  "person_dress",
  "user_tie",
  "users",

  "bag_shopping",
  "cart_shopping",
  "gift",

  "store",
  "shop",
  "warehouse",

  "box_open",
  "truck",

  "star",
  "award",
  "crown",
  "certificate",
  "gem",

  "heart",
  "check",
  "shield",

  "leaf",
  "recycle",

  "tags",
  "percent",

  "magnifying_glass",

  "clock",

  "phone",
  "envelope",
  "comments",

  "instagram",
  "globe",
] as const;

export const FEATURE_ICONS_MAP = {
  default: FaShirt,

  shirt: FaShirt,
  scissors: FaScissors,
  ruler: FaRuler,

  palette: FaPalette,
  paintbrush: FaPaintbrush,

  person_dress: FaPersonDress,
  user_tie: FaUserTie,
  users: FaUsers,

  bag_shopping: FaBagShopping,
  cart_shopping: FaCartShopping,
  gift: FaGift,

  store: FaStore,
  shop: FaShop,
  warehouse: FaWarehouse,

  box_open: FaBoxOpen,
  truck: FaTruck,

  star: FaStar,
  award: FaAward,
  crown: FaCrown,
  certificate: FaCertificate,
  gem: FaGem,

  heart: FaHeart,
  check: FaCheck,
  shield: FaShield,

  leaf: FaLeaf,
  recycle: FaRecycle,

  tags: FaTags,
  percent: FaPercent,

  magnifying_glass: FaMagnifyingGlass,

  clock: FaClock,

  phone: FaPhone,
  envelope: FaEnvelope,
  comments: FaComments,

  instagram: FaInstagram,
  globe: FaGlobe,
} as const;