package servlet;

import dao.AlumnowebJpaController;
import dto.Alumnoweb;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.JSONObject;
import org.mindrot.jbcrypt.BCrypt;

@WebServlet(name = "crearUsuario", urlPatterns = {"/crearUsuario"})
public class crearUsuario extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        try (PrintWriter out = response.getWriter()) {

            String dni = request.getParameter("dni");
            String appa = request.getParameter("appa");
            String apma = request.getParameter("apma");
            String nombre = request.getParameter("nombre");
            String fechaNaci = request.getParameter("fecha");
            String login = request.getParameter("usuario");
            String contra = request.getParameter("contra");
            
            try {
                AlumnowebJpaController usuDAO=new AlumnowebJpaController();
                
                SimpleDateFormat miFormato = new SimpleDateFormat("yyyy-MM-dd");
                Date fecha = miFormato.parse(fechaNaci);

                // Hashear la contraseña antes de guardarla
                String hashedContra = BCrypt.hashpw(contra, BCrypt.gensalt(12));

                Alumnoweb p = new Alumnoweb(0, dni, appa, apma, nombre, fecha, login, hashedContra);

                usuDAO.create(p); //crear usuario y guarda la contra en la BD con la contraseña hasheada

                JSONObject jSONObject = new JSONObject();
                jSONObject.put("resultado", "ok");
                jSONObject.put("mensaje", "Usuario creado exitosamente");
                out.print(jSONObject.toString());
            } catch (Exception ex) {
                JSONObject jSONObject = new JSONObject();
                jSONObject.put("resultado", "error");
                jSONObject.put("mensaje", ex.getMessage());
                out.print(jSONObject.toString());
            }

        }
    }

    
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
