import { FullMetadata } from "firebase/storage";

/**
 * Interface to represent a file.
 * 
 * @property {string} name - The name of the file.
 * @property {string} url - The URL of the file.
 * @property {number} size - The size of the file in bytes.
 * @property {Date} timeOfCreation - The time of creation of the file.
 * @property {FullMetadata} metadata - The metadata of the file.
 */
export interface FileType {
  name: string;
  url: string;
  size: number;
  timeOfCreation: Date;
  metadata: FullMetadata;
}