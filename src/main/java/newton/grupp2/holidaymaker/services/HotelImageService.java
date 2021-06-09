package newton.grupp2.holidaymaker.services;

import newton.grupp2.holidaymaker.entities.HotelImage;
import newton.grupp2.holidaymaker.repositories.HotelImageRepository;
import newton.grupp2.holidaymaker.utils.HmUtils;
import org.imgscalr.Scalr;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Date;
import java.util.List;

@Service
public class HotelImageService {

    @Autowired
    private HotelImageRepository hotelImageRepository;

    public HotelImage saveImageToFileSystem(MultipartFile imageFile) throws Exception {
        String originalFileName = imageFile.getOriginalFilename();
        long currentTime = new Date().getTime();
        String outputFileName = currentTime + "-" + originalFileName;
        byte[] bytes = imageFile.getBytes();
        Path path = HmUtils.imagesPath.resolve(outputFileName);

        // Save the file
        String savedFileName = Files.write(path, bytes).getFileName().toString();
        return new HotelImage(savedFileName);
    }

    /**
     * Call this method when you have added more images.
     * This will generate thumbnails for them for faster loading in frontend.
     */
    public void createThumbnails() {
        List<HotelImage> allHotelImages = hotelImageRepository.findAll();
        int skipped = 0;
        int amountOfImages = allHotelImages.size();
        for(int i = 0; i < amountOfImages; i++) {
            HotelImage image = allHotelImages.get(i);
            if(image.getThumbnailFileName() != null) {
                // Generera ingen bild ifall en thumbnail redan är genererad sedan tidigare.
                skipped++;
                continue;
            }

            Path path = HmUtils.imagesPath.resolve(image.getFileName());
            byte[] imageBytes = null;
            try {
                imageBytes = Files.readAllBytes(path);
                String fileName = image.getFileName();
                String filenameWithoutExt = fileName.substring(0, fileName.lastIndexOf("."));
                String fileExtension = fileName.substring(fileName.lastIndexOf(".") + 1);
                String thumbnailFileName = filenameWithoutExt + "-thumbnail." + fileExtension;
                Path thumbnailPath = HmUtils.imagesPath.resolve(thumbnailFileName);

                ByteArrayOutputStream thumbOutput = new ByteArrayOutputStream();
                BufferedImage thumbImg = null;
                BufferedImage img = ImageIO.read(new ByteArrayInputStream(imageBytes));
                System.out.println("Working on " + fileName);
                System.out.print("Creating thumbnail... ");
                thumbImg = Scalr.resize(img, Scalr.Method.AUTOMATIC, Scalr.Mode.AUTOMATIC, 640, Scalr.OP_ANTIALIAS);
                System.out.println("done");
                System.out.print("Saving image... ");
                ImageIO.write(thumbImg, fileExtension, thumbOutput);
                System.out.println("done");
                image.setThumbnailFileName(thumbnailFileName);
                hotelImageRepository.save(image);
                String finalName = Files.write(thumbnailPath, thumbOutput.toByteArray()).getFileName().toString();
                System.out.println("Saved thumbnail as " + finalName + " (" + (i + 1) + "/" + allHotelImages.size() + ")");
                System.out.println("=====");
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        System.out.printf("Skipped generation of thumbnails for %d/%d images.%n", skipped, amountOfImages);
    }
}












