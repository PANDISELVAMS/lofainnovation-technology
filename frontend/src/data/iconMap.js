import { FaGlobe, FaMobileAlt, FaCode, FaBuilding, FaUsers, FaRobot, FaCogs, FaCloud, FaPaintBrush, FaBullhorn, FaSearch, FaShieldAlt, FaPlug, FaLayerGroup, FaTools } from "react-icons/fa";

// Services are stored as plain JSON (icon: "FaGlobe") so they can be saved
// to localStorage from the admin panel. This map resolves the string back
// to the actual icon component for rendering.
export const iconMap = { FaGlobe, FaMobileAlt, FaCode, FaBuilding, FaUsers, FaRobot, FaCogs, FaCloud, FaPaintBrush, FaBullhorn, FaSearch, FaShieldAlt, FaPlug, FaLayerGroup, FaTools };
export const iconOptions = Object.keys(iconMap);
