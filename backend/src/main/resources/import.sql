INSERT INTO tb_brand (name) VALUES ('EVGA');
INSERT INTO tb_brand (name) VALUES ('GIGABYTE');
INSERT INTO tb_brand (name) VALUES ('ASUS');
INSERT INTO tb_brand (name) VALUES ('PNY');
INSERT INTO tb_brand (name) VALUES ('ZOTAC');
INSERT INTO tb_brand (name) VALUES ('SAPPHIRE');

INSERT INTO tb_gpu (name, manufacturer, memory_size_gb, memory_type) VALUES ('RTX 3080', 1, 12, 'GDDR6');
INSERT INTO tb_gpu (name, manufacturer, memory_size_gb, memory_type) VALUES ('RTX 3070', 1, 8, 'GDDR6');
INSERT INTO tb_gpu (name, manufacturer, memory_size_gb, memory_type) VALUES ('RTX 3060', 1, 8, 'GDDR6');
INSERT INTO tb_gpu (name, manufacturer, memory_size_gb, memory_type) VALUES ('RTX 3050', 1, 8, 'GDDR6');
INSERT INTO tb_gpu (name, manufacturer, memory_size_gb, memory_type) VALUES ('RTX 3060TI', 1, 12, 'GDDR5');
INSERT INTO tb_gpu (name, manufacturer, memory_size_gb, memory_type) VALUES ('RTX 2080', 1, 12, 'GDDR5');
INSERT INTO tb_gpu (name, manufacturer, memory_size_gb, memory_type) VALUES ('RTX 2070', 1, 8, 'GDDR5');

INSERT INTO tb_videocard ( model, specs, price, brand_id, gpu_id) VALUES ('MODELO X','SPECS AQUI', 5000.0, 1,1 );
INSERT INTO tb_videocard ( model, specs, price, brand_id, gpu_id) VALUES ('MODELO Y','SPECS AQUI', 4000.0, 2,4 );
INSERT INTO tb_videocard ( model, specs, price, brand_id, gpu_id) VALUES ('MODELO Z','SPECS AQUI', 3000.0, 3,2 );
INSERT INTO tb_videocard ( model, specs, price, brand_id, gpu_id) VALUES ('MODELO A','SPECS AQUI', 2000.0, 6,3 );
INSERT INTO tb_videocard ( model, specs, price, brand_id, gpu_id) VALUES ('MODELO B','SPECS AQUI', 1000.0, 5,1 );
INSERT INTO tb_videocard ( model, specs, price, brand_id, gpu_id) VALUES ('MODELO C','SPECS AQUI', 900.0, 4,3 );
