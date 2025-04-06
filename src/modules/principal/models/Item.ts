/**
 * Item interface represents a portfolio project item
 * Used to display project information in portfolio sections
 */
export interface Item {
  /** URL or path to the project image */
  image: string;
  /** URL to the project's GitHub repository */
  githubLink: string;
  /** Project title */
  title: string;
  /** Project description */
  description: string;
  /** List of technologies used in the project */
  technologies: string[];
}
