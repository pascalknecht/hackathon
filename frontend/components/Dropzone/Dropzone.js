import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Center,
  useColorModeValue,
  Icon,
  Flex,
  Stack,
  Button,
} from "@chakra-ui/react";
import { Box } from "@chakra-ui/layout";
import { ArrowUpIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";

export default function Dropzone({ onFileAccepted, ...props }) {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file) => (
    <Box maxWidth={75} key={file.name}>
      <div>
        <Box as={"img"} display="block" src={file.preview} />
      </div>
    </Box>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const removeImage = useCallback((e) => {
    e.stopPropagation();
    setFiles([]);
  });

  const activeBg = useColorModeValue("gray.100", "gray.600");
  const borderColor = useColorModeValue(
    isDragActive ? "teal.300" : "gray.300",
    isDragActive ? "teal.500" : "gray.500"
  );

  return (
    <>
      <Center
        p={files.length === 0 ? 10 : 0}
        cursor="pointer"
        bg={isDragActive ? activeBg : "transparent"}
        _hover={{ bg: activeBg }}
        transition="background-color 0.2s ease"
        borderRadius={4}
        border="3px dashed"
        borderColor={borderColor}
        position="relative"
        {...getRootProps()}
        {...props}
      >
        <input {...getInputProps()} />
        {files.length === 0 ? (
          <>
            <ArrowUpIcon mr={2} />
            <p>Upload</p>
          </>
        ) : (
          <img src={files[0].preview} />
        )}
        {files.length !== 0 && (
          <Button position="absolute" top="0" right="0" onClick={removeImage}>
            <DeleteIcon />
          </Button>
        )}
      </Center>
    </>
  );
}
