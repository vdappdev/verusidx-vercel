// components/ui/address-link.tsx
import React from "react";

interface AddressLinkProps {
  address: string;
  className?: string;
}

/**
 * Renders an address as a clickable explorer link if it's an Ethereum address, otherwise just plain text.
 * - Recognizes 0x-prefixed, 42-char HEX (ETH/ERC-20 addresses)
 */
export const AddressLink: React.FC<AddressLinkProps> = ({ address, className }) => {
  if (/^0x[a-fA-F0-9]{40}$/.test(address)) {
    return (
      <a
        href={`https://etherscan.io/address/${address}`}
        target="_blank"
        rel="noopener noreferrer"
        className={className ? `text-blue-600 hover:text-blue-700 hover:underline dark:text-blue-400 dark:hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 rounded-sm ${className}` : "text-blue-600 hover:text-blue-700 hover:underline dark:text-blue-400 dark:hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 rounded-sm"}
        title="View on Etherscan"
      >
        {address}
      </a>
    );
  }
  return <span className={className}>{address}</span>;
};
