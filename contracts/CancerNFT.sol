//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.8;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165Storage.sol";
import "@openzeppelin/contracts/interfaces/IERC165.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";
import "./Splitter.sol";

///
/// @dev Interface for the NFT Royalty Standard
///
interface IERC2981 is IERC165 {
    /// ERC165 bytes to add to interface array - set in parent contract
    /// implementing this standard
    ///
    /// bytes4(keccak256("royaltyInfo(uint256,uint256)")) == 0x2a55205a
    /// bytes4 private constant _INTERFACE_ID_ERC2981 = 0x2a55205a;
    /// _registerInterface(_INTERFACE_ID_ERC2981);

    /// @notice Called with the sale price to determine how much royalty
    //          is owed and to whom.
    /// @param _tokenId - the NFT asset queried for royalty information
    /// @param _salePrice - the sale price of the NFT asset specified by _tokenId
    /// @return receiver - address of who should be sent the royalty payment
    /// @return royaltyAmount - the royalty payment amount for _salePrice
    function royaltyInfo(
        uint256 _tokenId,
        uint256 _salePrice
    ) external view returns (
        address receiver,
        uint256 royaltyAmount
    );
}


contract CancerNFT is ERC721, IERC2981, Ownable {
    // ERC165
    bytes4 private constant _INTERFACE_ID_ERC2981 = 0x2a55205a;
    bytes4 private constant _INTERFACE_ID_ERC721 = 0x80ac58cd;
    bytes4 private constant _INTERFACE_ID_ERC721_METADATA = 0x5b5e139f;
    mapping(bytes4 => bool) private _supportedInterfaces;

    address public royaltyDestination;
    uint8 public defaultRoyaltyFraction = 10; // 10 / 100 = 10%

    //

    struct Info {
        address artist;
        uint8 royaltyFraction;
        string uri;
    }
    mapping(uint256 => Info) nfts;    
    uint256 public collectionSize;

    string public licenseURI;

    constructor(string memory name_, string memory symbol_, string memory licenseURI_) ERC721(name_, symbol_) {
        _registerInterface(_INTERFACE_ID_ERC2981);
        _registerInterface(_INTERFACE_ID_ERC721);
        _registerInterface(_INTERFACE_ID_ERC721_METADATA);
        transferOwnership(_msgSender());
        royaltyDestination = address(new Splitter(_msgSender()));
        licenseURI = licenseURI_;
    }

    function setArtist(uint256 tokenId, address artist) external onlyOwner {
        nfts[tokenId].artist = artist;
    }

    function setRoyaltyFraction(uint256 tokenId, uint8 royaltyFraction) external onlyOwner {
        nfts[tokenId].royaltyFraction = royaltyFraction;
    }

    function setURI(uint256 tokenId, string memory uri_) external onlyOwner {
        nfts[tokenId].uri = uri_;
    }

    //

    function setDefaultRoyaltyFraction(uint8 royaltyFraction) external onlyOwner {
        defaultRoyaltyFraction = royaltyFraction;
    }

    function setDefaultRoyaltyDestination(address royaltyDestination_) external onlyOwner {
        royaltyDestination = royaltyDestination_;
    }

    /// Mints a batch of NFTs but requires the user to come through later and set NFT-specific data
    function mintBatch(address to, uint256 amount) external onlyOwner {
        for (uint256 i = 0; i < amount; i++) {
            _mintHelper(to, address(0), defaultRoyaltyFraction, "");
        }
    }

    /// Mints a single NFT and sets NFT-specific data at the same time
    function mint(address to, address artist, uint8 royaltyFraction, string calldata uri) external onlyOwner {
        _mintHelper(to, artist, royaltyFraction, uri);
    }

    function royaltyInfo(uint256 tokenId, uint256 _salePrice) external view returns (address receiver, uint256 royaltyAmount) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        // TODO: Artist slice
        return (royaltyDestination, uint256(_salePrice * nfts[tokenId].royaltyFraction / 100));
    }


    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return nfts[tokenId].uri;
    }

    function checkNFTInitialized(uint256 tokenId) external view returns (bool) {
        return nfts[tokenId].artist != address(0) && keccak256(abi.encodePacked(nfts[tokenId].uri)) != keccak256(abi.encodePacked(""));
    }

    //

    function _mintHelper(address to, address artist, uint8 royaltyFraction, string memory uri) internal {
        _safeMint(to, collectionSize);
        nfts[collectionSize] = Info(artist, royaltyFraction, uri);
        collectionSize++;
    }

    function _registerInterface(bytes4 interfaceId) internal {
        require(interfaceId != 0xffffffff, "ERC165: invalid interface id");
        _supportedInterfaces[interfaceId] = true;
    }
}
